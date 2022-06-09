import { StatusBar as RNStatusBar } from 'react-native';
import { useColorMode } from '~services/theming';
import { useTheme } from '~styles/styled';

export default function StatusBar() {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  return (
    <RNStatusBar
      barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.background}
    />
  );
}
