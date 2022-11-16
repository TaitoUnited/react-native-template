import { ReactNode, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles';
import { navigationRef, useNavigationStateRestoration } from '~screens/utils';
import storage from '~utils/storage';

export default function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { isReady, initialState } = useNavigationStateRestoration();

  // Clear persisted navigation state when the app has rendered successfully.
  // We only want to restore the navigation state when the locale is chnaged
  // and the app is forced to remount from scratch (which loses navigation state).
  useEffect(() => {
    if (isReady) storage.remove('@app/navigation-state').catch(console.log);
  }, [isReady]);

  if (!isReady) return null;

  return (
    <NavigationContainer
      initialState={initialState}
      ref={navigationRef}
      theme={{
        dark: colorMode === 'dark',
        colors: {
          card: theme.colors.surface,
          background: theme.colors.background,
          border: theme.colors.border,
          text: theme.colors.text,
          primary: theme.colors.primary,
          notification: theme.colors.error,
        },
      }}
    >
      {children}
    </NavigationContainer>
  );
}
