import { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles';

export default function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <NavigationContainer
      theme={{
        dark: colorMode === 'dark',
        colors: {
          ...theme.colors,
          card: theme.colors.primary,
          notification: theme.colors.primaryText,
        },
      }}
    >
      {children}
    </NavigationContainer>
  );
}
