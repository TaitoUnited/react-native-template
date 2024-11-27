import { Trans, msg } from '@lingui/macro';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { showToast } from '~components/common/Toaster';
import { Button, Stack, Text, TextInput } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { useI18n } from '~services/i18n';
import { styled } from '~styles/styled';
import { announceForAccessibility } from '~utils/a11y';

type Credentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password1: string;
  password2: string;
};

export const MIN_PASSWORD_LENGTH = 8;

export default function Signup() {
  const { _ } = useI18n();
  const form = useForm<Credentials>({ mode: 'onChange' });
  const password = form.watch('password1');
  const { status, signup } = useAuthStore();
  const isValidForm = form.formState.isValid && status !== 'signing-in';

  async function handleSubmit() {
    try {
      const { password1, password2, ...values } = form.getValues(); // eslint-disable-line @typescript-eslint/no-unused-vars

      const credentials = {
        ...values,
        password: password1,
        email: values.email.toLowerCase(),
      };

      await signup(credentials);
      announceForAccessibility({
        message: _(msg`Signed up successfully, entering the app`),
      });
    } catch (error) {
      console.log('> Failed to signup', error);
      showToast({ title: _(msg`Failed to signup`), type: 'error' });
    }
  }

  return (
    <KeyboardAwareView>
      <InnerStack axis="y" spacing="small" justify="between">
        <Stack axis="y" spacing="small">
          <Stack axis="y" spacing="small">
            <Text variant="headingL" accessibilityRole="header">
              <Trans>Create an account</Trans>
            </Text>
            <Text variant="bodySmall" color="textMuted">
              <Trans>
                Don&lsquo;t worry, these won&lsquo;t actually be saved.
              </Trans>
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
                    message={message}
                    isValid={!message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => form.setFocus('firstName')}
                    testID="emailInput"
                  />
                );
              }}
            />
            <Controller
              name="firstName"
              control={form.control}
              rules={{ required: _(msg`First name is required`) }}
              render={({ field, fieldState }) => {
                return (
                  <TextInput
                    {...field}
                    label={_(msg`First name`)}
                    message={fieldState.error?.message}
                    isValid={!fieldState.error}
                    returnKeyType="next"
                    textContentType="givenName"
                    onSubmitEditing={() => form.setFocus('lastName')}
                    testID="firstNameInput"
                  />
                );
              }}
            />
            <Controller
              name="lastName"
              control={form.control}
              rules={{ required: _(msg`Last name is required`) }}
              render={({ field, fieldState }) => {
                return (
                  <TextInput
                    {...field}
                    label={_(msg`Last name`)}
                    message={fieldState.error?.message}
                    isValid={!fieldState.error}
                    returnKeyType="next"
                    textContentType="familyName"
                    onSubmitEditing={() => form.setFocus('phoneNumber')}
                    testID="lastNameInput"
                  />
                );
              }}
            />
            <Controller
              name="phoneNumber"
              control={form.control}
              rules={{ required: _(msg`Phone number is required`) }}
              render={({ field, fieldState }) => {
                const message =
                  fieldState.error?.message ||
                  _(msg`Preferred format: +358400123456`);

                return (
                  <TextInput
                    {...field}
                    label={_(msg`Phone number`)}
                    message={message}
                    isValid={!fieldState.error}
                    returnKeyType="next"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onSubmitEditing={() => form.setFocus('password1')}
                    testID="phoneNumberInput"
                  />
                );
              }}
            />

            <Controller
              name="password1"
              control={form.control}
              rules={{ required: true, minLength: MIN_PASSWORD_LENGTH }}
              render={({ field, fieldState }) => {
                const message =
                  fieldState.error?.type === 'minLength'
                    ? _(msg`Password must be at least 8 characters`)
                    : fieldState.error?.type === 'required'
                      ? _(msg`Password is required`)
                      : undefined;

                return (
                  <TextInput
                    {...field}
                    label={_(msg`Password`)}
                    message={message}
                    isValid={!fieldState.error}
                    secureTextEntry
                    returnKeyType="next"
                    textContentType="newPassword"
                    onSubmitEditing={() => form.setFocus('password2')}
                    testID="passwordInput"
                  />
                );
              }}
            />

            <Controller
              name="password2"
              control={form.control}
              rules={{
                validate: {
                  required: (v) => !!v,
                  minLength: (v) => v && v.length >= MIN_PASSWORD_LENGTH,
                  passwordsMatch: (v) => v && v === password,
                },
              }}
              render={({ field, fieldState }) => {
                const message =
                  fieldState.error?.type === 'passwordsMatch'
                    ? _(msg`Passwords do not match`)
                    : fieldState.error?.type === 'minLength'
                      ? _(msg`Password must be at least 8 characters`)
                      : fieldState.error?.type === 'required'
                        ? _(msg`Password is required`)
                        : undefined;

                return (
                  <TextInput
                    {...field}
                    label={_(msg`Password again`)}
                    message={message}
                    isValid={!fieldState.error}
                    secureTextEntry
                    textContentType="newPassword"
                    returnKeyType="done"
                    testID="confirmPasswordInput"
                  />
                );
              }}
            />
          </Stack>
        </Stack>

        <Button
          color="primary"
          variant="filled"
          size="large"
          onPress={form.handleSubmit(handleSubmit)}
          disabled={!isValidForm}
          loading={status === 'signing-in'}
          testID="signupButton"
          accessibilityHint={_(msg`Double tap to signup with the provided information`)} // prettier-ignore
        >
          <Trans>Signup</Trans>
        </Button>
      </InnerStack>
    </KeyboardAwareView>
  );
}

const InnerStack = styled(Stack, {
  padding: '$medium',
  flex: 1,
});

const KeyboardAwareView = styled(KeyboardAwareScrollView, {
  flex: 1,
}).attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
  },
}));
