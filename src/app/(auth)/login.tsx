import { Trans, msg } from '@lingui/macro';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { showToast } from '~components/common/Toaster';
import { Button, Stack, Text, TextInput } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';

type Credentials = {
  email: string;
  password: string;
};
export default function Login() {
  const { _ } = useI18n();
  const form = useForm<Credentials>({ mode: 'onBlur' });
  const { status, login } = useAuthStore();

  async function handleSubmit() {
    try {
      await login(form.getValues());
    } catch (error) {
      console.log('> Failed to login', error);
      showToast({ title: _(msg`Failed to login`), type: 'error' });
    }
  }

  return (
    <KeyboardAwareView behavior={'padding'} keyboardVerticalOffset={100}>
      <InnerStack axis="y" spacing="medium" justify="between">
        <Stack axis="y" spacing="medium">
          <Stack axis="y" spacing="small">
            <Text variant="headingL">
              <Trans>Enter your credentials</Trans>
            </Text>
            <Text variant="bodySmall" color="textMuted">
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
                    ? _(msg`Email invalid`)
                    : fieldState.error?.type === 'required'
                      ? _(msg`Email required`)
                      : undefined;

                return (
                  <TextInput
                    {...field}
                    label={_(msg`Email`)}
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
              rules={{ required: _(msg`Password is required`) }}
              render={({ field, fieldState }) => {
                return (
                  <TextInput
                    {...field}
                    label={_(msg`Password`)}
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
          disabled={status === 'logging-in'}
          loading={status === 'logging-in'}
          testID="loginButton"
        >
          <Trans>Login</Trans>
        </Button>
      </InnerStack>
    </KeyboardAwareView>
  );
}

const InnerStack = styled(Stack, {
  padding: '$medium',
  flex: 1,
});

const KeyboardAwareView = styled(KeyboardAvoidingView, {
  flex: 1,
}).attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
  },
}));
