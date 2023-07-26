import { SplashScreen, Stack, router } from 'expo-router';
import { DevSettings } from 'react-native';
import { useLingui } from '@lingui/react';
import { useProtectedRoute } from '../context/auth';
import Providers from '~Providers';
import StatusBar from '~components/common/StatusBar';
import { useAppReady } from '~utils/init';
import { useDefaultStackScreenOptions } from '~utils/navigation';

if (__DEV__) {
  DevSettings.addMenuItem('Open Playground', () => router.push('playground'));
  DevSettings.addMenuItem('Open Sitemap', () => router.push('_sitemap'));
}

SplashScreen.preventAutoHideAsync();

export default function StackLayout() {
  console.log(`>> Here's the StackLayout!`);
  useAppReady();

  return (
    <Providers>
      <RootLayoutNav />
      <StatusBar />
    </Providers>
  );
}

function RootLayoutNav() {
  console.log(`>> Here's the root layout nav!`);
  const screenOptions = useDefaultStackScreenOptions();
  useLingui();

  useProtectedRoute();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        ...screenOptions,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen name="menu-list/[item]" options={{ headerShown: true }} />
    </Stack>
  );
}
