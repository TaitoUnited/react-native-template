import { registerDevMenuItems } from 'expo-dev-menu';
import { Stack, router, usePathname, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DevSettings, Platform } from 'react-native';

import Providers from '~Providers';
import StatusBar from '~components/common/StatusBar';
import Meta from '~components/web/Meta';
import { useAuthStore } from '~services/auth';
import { useEffectEvent } from '~utils/common';
import { useAppReady } from '~utils/init';
import { useDefaultStackScreenOptions } from '~utils/navigation';

if (__DEV__ && ['android', 'ios'].includes(Platform.OS)) {
  const devMenuItems = [
    {
      name: 'Open Playground', // eslint-disable-line lingui/no-unlocalized-strings
      callback: () => router.navigate('/playground'),
    },
    {
      name: 'Open Sitemap', // eslint-disable-line lingui/no-unlocalized-strings
      callback: () => router.navigate('/_sitemap'),
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

  if (!appReady) return null;

  return (
    <Providers>
      <Meta />
      <RootLayoutNavigator />
      <StatusBar transparent />
      {appReady && <RouteProtection />}
    </Providers>
  );
}

function RootLayoutNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen
        name="menu-list/[item]"
        options={{ headerShown: true, ...screenOptions }}
      />
    </Stack>
  );
}

// We are guaranteed to be either in `unauthenticated` or `authenticated` state
// at this point so we don't need to care about the other auth states
function RouteProtection() {
  const segments = useSegments();
  const pathname = usePathname();
  const authStatus = useAuthStore((s) => s.status);
  const notInAuthRoute = segments[0] !== '(auth)';
  const notInDevRoutes = pathname !== '/_sitemap' && pathname !== '/playground';

  const onAuthChange = useEffectEvent(() => {
    if (authStatus === 'unauthenticated' && notInAuthRoute) {
      router.replace('/(auth)/landing');
    } else if (authStatus === 'authenticated') {
      router.replace('/(tabs)/home');
    }
  });

  const onPathChange = useEffectEvent(() => {
    if (authStatus === 'unauthenticated' && notInAuthRoute && notInDevRoutes) {
      router.navigate('/(auth)/landing');
    }
  });

  useEffect(() => onAuthChange(), [authStatus]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => onPathChange(), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
