import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { type ReactNode } from 'react';

import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles';

export default function NavigationThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const { colorScheme } = useColorMode();

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : {
              ...DefaultTheme,
              colors: {
                card: theme.colors.surface,
                background: theme.colors.neutral5,
                border: theme.colors.line3,
                text: theme.colors.text,
                primary: theme.colors.primary,
                notification: theme.colors.error,
              },
            }
      }
    >
      {children}
    </ThemeProvider>
  );
}
