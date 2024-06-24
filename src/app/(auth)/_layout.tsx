import { msg } from '@lingui/macro';
import { Stack } from 'expo-router';

import { useI18n } from '~services/i18n';
import { useDefaultStackScreenOptions } from '~utils/navigation';

export default function AuthLayout() {
  const { _ } = useI18n();
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions} initialRouteName="landing">
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: _(msg`Login`) }} />
      <Stack.Screen name="signup" options={{ title: _(msg`Signup`) }} />
    </Stack>
  );
}
