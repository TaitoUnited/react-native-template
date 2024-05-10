import { t } from '@lingui/macro';
import { Stack } from 'expo-router';

import { useDefaultStackScreenOptions } from '~utils/navigation';

export default function AuthLayout() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions} initialRouteName="landing">
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: t`Login` }} />
      <Stack.Screen name="signup" options={{ title: t`Signup` }} />
    </Stack>
  );
}
