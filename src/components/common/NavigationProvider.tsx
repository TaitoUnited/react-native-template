import { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles';
import { navigationRef } from '~screens/utils';

export default function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const { colorScheme } = useColorMode();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: colorScheme === 'dark',
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
