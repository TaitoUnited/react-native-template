import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { DevSettings } from 'react-native';
import { useAuth } from '../context/auth';
import Providers from '~Providers';
import SplashScreen from '~components/common/SplashScreen';
import StatusBar from '~components/common/StatusBar';
import { useAppReady } from '~utils/init';
import { useDefaultStackScreenOptions } from '~utils/navigation';

if (__DEV__) {
  DevSettings.addMenuItem('Open Playground', () => router.push('playground'));
  DevSettings.addMenuItem('Open Sitemap', () => router.push('_sitemap'));
}

export default function StackLayout() {
  const ready = useAppReady();

  return (
    <SplashScreen ready={ready}>
      <Providers>
        <RootLayoutNav />
        <StatusBar />
      </Providers>
    </SplashScreen>
  );
}

function RootLayoutNav() {
  const screenOptions = useDefaultStackScreenOptions();
  const { initAuth } = useAuth();

  useEffect(() => {
    async function init() {
      await initAuth();
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        ...screenOptions,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="menuList/[menuListItem]"
        options={{ headerShown: true }}
      />
    </Stack>
  );
}
