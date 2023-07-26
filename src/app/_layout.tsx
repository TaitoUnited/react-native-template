import { useEffect, useState } from 'react';
import { DevSettings } from 'react-native';
import { useLingui } from '@lingui/react';

import {
  SplashScreen,
  Stack,
  router,
  useRootNavigation,
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
  DevSettings.addMenuItem('Open Playground', () => router.push('playground'));
  DevSettings.addMenuItem('Open Sitemap', () => router.push('_sitemap'));
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useAppReady();

  return (
    <Providers>
      <RootLayoutNavigator />
      <StatusBar />
    </Providers>
  );
}

function RootLayoutNavigator() {
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
      <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen name="menu-list/[item]" options={{ headerShown: true }} />
    </Stack>
  );
}

const useProtectedRoute = () => {
  const authStatus = useAuthStore((s) => s.status);
  const [isNavigationReady, setNavigationReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();
  const inAuthGroup = segments[0] === '(auth)';
  console.log(`>> useProtectedRoute`, inAuthGroup, authStatus);

  const onNavigationStateChange = useEffectEvent(() => {
    // if (!inAuthGroup && authStatus === 'unauthenticated') {
    //  router.replace('/(auth)/landing');
    // }

    setNavigationReady(true);
  });

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener(
      'state',
      onNavigationStateChange
    );
    return () => unsubscribe?.();
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (
      // If the status is not signed in and the initial segment is not anything in the auth group.
      authStatus === 'unauthenticated' &&
      !inAuthGroup
    ) {
      // Redirect to the auth group.
      router.replace('/(auth)/landing');
    } else if (authStatus === 'authenticated') {
      // Redirect away from the auth group.
      router.replace('/(tabs)/home');
    }
  }, [authStatus]);
};
