import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { type ReactNode } from 'react';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

export default function NavigationThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useUnistyles();

  return (
    <ThemeProvider
      value={
        UnistylesRuntime.colorScheme === 'dark'
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
