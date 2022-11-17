import { StatusBar as RNStatusBar } from 'react-native';
import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles/styled';

export default function StatusBar() {
  const { colorScheme } = useColorMode();
  const theme = useTheme();

  return (
    <RNStatusBar
      barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.background}
    />
  );
}
