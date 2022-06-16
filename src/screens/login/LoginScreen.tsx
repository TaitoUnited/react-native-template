import { useForm, Controller } from 'react-hook-form';
import { t, Trans } from '@lingui/macro';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styled } from '~styles/styled';
import { useAuthStore } from '~services/auth';
import { showToast } from '~components/common/Toaster';
import { FillButton, Text, TextInput, Stack } from '~components/uikit';
import StatusBar from '~components/common/StatusBar';

type Credentials = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const form = useForm<Credentials>({ mode: 'onBlur' });
  const status = useAuthStore((s) => s.status);
  const login = useAuthStore((s) => s.login);

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
            <Stack axis="y" spacing="xsmall">
              <Text variant="title1">
                <Trans>Welcome to Faces!</Trans>
              </Text>

              <Text variant="title3">
                <Trans>Login with your account</Trans>
              </Text>
            </Stack>

            <Stack axis="y" spacing="normal">
              <Controller
                name="email"
                control={form.control}
                rules={{
                  validate: {
                    required: (v) => !!v,
                    // validEmail: (v) => v && v.includes('@'), // TODO: add validator
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
                    />
                  );
                }}
              />
            </Stack>
          </Stack>

          <PushContent />

          <FillButton
            variant="primary"
            onPress={form.handleSubmit(handleSubmit)}
            disabled={status === 'logging-in'}
            loading={status === 'logging-in'}
          >
            {status === 'logging-in' ? (
              <Trans>Logging in...</Trans>
            ) : (
              <Trans>Login</Trans>
            )}
          </FillButton>
        </Scroller>
      </Wrapper>

      <StatusBar />
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
    padding: p.theme.space.normal,
  },
}));

const PushContent = styled('View', {
  flexGrow: 1,
  marginTop: '$medium',
});
