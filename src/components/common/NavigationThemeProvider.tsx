import { ReactNode } from 'react';
import { ThemeProvider } from '@react-navigation/native';

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
      value={{
        dark: colorScheme === 'dark',
        colors: {
          card: theme.colors.surface,
          background: theme.colors.surfaceHover, // NOTE: used to be background. TODO: Check if we decide to add again a background color
          border: theme.colors.line3, // NOTE: used to be border. TODO: check if this is correct
          text: theme.colors.text,
          primary: theme.colors.primary,
          notification: theme.colors.error,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
}
