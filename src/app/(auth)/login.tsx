import { Trans, useLingui } from '@lingui/react/macro';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

import { showToast } from '~components/common/Toaster';
import { Button, Stack, Text, TextInput } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { announceForAccessibility } from '~utils/a11y';
import { haptics } from '~utils/haptics';

type Credentials = {
  email: string;
  password: string;
};

export default function Login() {
  const { t } = useLingui();
  const form = useForm<Credentials>({ mode: 'onChange' });
  const { status, login } = useAuthStore();

  async function handleSubmit() {
    try {
      await login(form.getValues());
      announceForAccessibility({
        message: t`Logged in successfully, entering the app`,
      });
      haptics.notificationSuccess();
    } catch (error) {
      console.log('> Failed to login', error);
      showToast({ title: t`Failed to login`, type: 'error' });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <Stack
        style={styles.innerStack}
        axis="y"
        spacing="medium"
        justify="between"
      >
        <Stack axis="y" spacing="medium">
          <Stack axis="y" spacing="small">
            <Text variant="headingL" accessibilityRole="header">
              <Trans>Enter your credentials</Trans>
            </Text>
            <Text
              variant="bodySmall"
              color="textMuted"
              accessibilityRole="text"
            >
              <Trans>You can enter any email and password to login.</Trans>
            </Text>
          </Stack>

          <Stack axis="y" spacing="regular">
            <Controller
              name="email"
              control={form.control}
              rules={{
                validate: {
                  required: (v) => !!v,
                  validEmail: (v) => v && v.includes('@'),
                },
              }}
              render={({ field, fieldState }) => {
                const message =
                  fieldState.error?.type === 'validEmail'
                    ? t`Email invalid`
                    : fieldState.error?.type === 'required'
                      ? t`Email required`
                      : undefined;

                return (
                  <TextInput
                    {...field}
                    label={t`Email`}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    message={message}
                    isValid={!message}
                    textContentType="emailAddress"
                    autoCorrect={false}
                    onSubmitEditing={() => form.setFocus('password')}
                    testID="emailInput"
                  />
                );
              }}
            />

            <Controller
              name="password"
              control={form.control}
              rules={{ required: t`Password is required` }}
              render={({ field, fieldState }) => {
                return (
                  <TextInput
                    {...field}
                    label={t`Password`}
                    secureTextEntry
                    returnKeyType="done"
                    message={fieldState.error?.message}
                    isValid={!fieldState.error}
                    textContentType="password"
                    onSubmitEditing={form.handleSubmit(handleSubmit)}
                    testID="passwordInput"
                  />
                );
              }}
            />
          </Stack>
        </Stack>

        <Button
          variant="filled"
          size="large"
          onPress={form.handleSubmit(handleSubmit)}
          disabled={status === 'logging-in' || !form.formState.isValid}
          loading={status === 'logging-in'}
          testID="loginButton"
          accessibilityHint={t`Double tap to log in with the provided email and password`} // prettier-ignore
        >
          <Trans>Login</Trans>
        </Button>
      </Stack>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  innerStack: {
    padding: theme.space.medium,
    flex: 1,
  },
}));
