import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';
import { registerDevMenuItems } from 'expo-dev-menu';
import { Stack, router, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DevSettings, Platform } from 'react-native';

import Providers from '~Providers';
import StatusBar from '~components/common/StatusBar';
import { useAuthStore } from '~services/auth';
import { useAppReady } from '~utils/init';
import { useDefaultStackScreenOptions } from '~utils/navigation';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.0,
  enableNativeFramesTracking: false,
  integrations: [navigationIntegration],
});

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

const RootLayout = () => {
  const appReady = useAppReady();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!appReady) return null;

  return (
    <Providers>
      <RootLayoutNavigator />
      <StatusBar transparent />
    </Providers>
  );
};

function RootLayoutNavigator() {
  const screenOptions = useDefaultStackScreenOptions();
  const isLoggedIn = useAuthStore((s) => s.status) === 'authenticated';

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      </Stack.Protected>
      <Stack.Screen
        name="menu-list/[item]"
        options={{ headerShown: true, ...screenOptions }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default Sentry.wrap(RootLayout);
