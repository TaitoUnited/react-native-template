import { t, Trans } from '@lingui/macro';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { showToast } from '~components/common/Toaster';
import { FillButton, Stack, Text, TextInput } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { styled } from '~styles/styled';

type Credentials = {
  email: string;
  password: string;
};

export default function Login() {
  const form = useForm<Credentials>({ mode: 'onBlur' });
  const { status, login } = useAuthStore();

  async function handleSubmit() {
    try {
      await login(form.getValues());
    } catch (error) {
      console.log('> Failed to login', error);
      showToast({ title: t`Failed to login`, type: 'error' });
    }
  }

  return (
    <SafeArea>
      <Wrapper>
        <Scroller>
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
                      onSubmitEditing={form.handleSubmit(handleSubmit)}
                      testID="passwordInput"
                    />
                  );
                }}
              />
            </Stack>
          </Stack>

          <PushContent />

          <FillButton
            variant="primary"
            size="large"
            onPress={form.handleSubmit(handleSubmit)}
            disabled={status === 'logging-in'}
            loading={status === 'logging-in'}
            testID="loginButton"
          >
            {status === 'logging-in' ? (
              <Trans>Logging in...</Trans>
            ) : (
              <Trans>Login</Trans>
            )}
          </FillButton>
        </Scroller>
      </Wrapper>
    </SafeArea>
  );
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
});

const Wrapper = styled('View', {
  flex: 1,
});

const Scroller = styled(KeyboardAwareScrollView, {
  flex: 1,
}).attrs((p) => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
    padding: p.theme.space.regular,
    paddingTop: p.theme.space.medium,
  },
}));

const PushContent = styled('View', {
  flexGrow: 1,
  marginTop: '$medium',
});
