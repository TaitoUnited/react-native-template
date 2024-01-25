import { useEffect } from 'react';
import { DevSettings } from 'react-native';
import { useLingui } from '@lingui/react';
import { registerDevMenuItems } from 'expo-dev-menu';

import {
  SplashScreen,
  Stack,
  router,
  usePathname,
  useRouter,
  useSegments,
} from 'expo-router';

import Providers from '~Providers';
import StatusBar from '~components/common/StatusBar';
import { useAppReady } from '~utils/init';
import { useDefaultStackScreenOptions } from '~utils/navigation';
import { useAuthStore } from '~services/auth';
import { useEffectEvent } from '~utils/common';

if (__DEV__) {
  const devMenuItems = [
    {
      name: 'Open Playground',
      callback: () => router.push('playground'),
    },
    {
      name: 'Open Sitemap',
      callback: () => router.push('_sitemap'),
    },
  ];

  registerDevMenuItems(devMenuItems);
  devMenuItems.forEach((item) => {
    DevSettings.addMenuItem(item.name, item.callback);
  });
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appReady = useAppReady();

  return (
    <Providers>
      <RootLayoutNavigator />
      <StatusBar transparent />
      {appReady && <RouteProtection />}
    </Providers>
  );
}

function RootLayoutNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  useLingui();

  return (
    <Stack screenOptions={{ headerShown: false, ...screenOptions }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen name="menu-list/[item]" options={{ headerShown: true }} />
    </Stack>
  );
}

// We are guaranteed to be either in `unauthenticated` or `authenticated` state
// at this point so we don't need to care about the other auth states
function RouteProtection() {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const authStatus = useAuthStore((s) => s.status);
  const notInAuthRoute = segments[0] !== '(auth)';

  const onAuthChange = useEffectEvent(() => {
    if (authStatus === 'unauthenticated' && notInAuthRoute) {
      router.replace('/(auth)/landing');
    } else if (authStatus === 'authenticated') {
      router.replace('/(tabs)/home');
    }
  });

  const onPathChange = useEffectEvent(() => {
    if (authStatus === 'unauthenticated' && notInAuthRoute) {
      router.replace('/');
      router.push('/(auth)/landing');
    }
  });

  useEffect(() => onAuthChange(), [authStatus]); // eslint-disable-line
  useEffect(() => onPathChange(), [pathname]); // eslint-disable-line

  return null;
}
