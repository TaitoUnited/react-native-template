import { StatusBar as RNStatusBar } from 'expo-status-bar';

import { useColorMode } from '~services/color-mode';
import { useTheme } from '~styles/styled';

export default function StatusBar({ transparent = false }) {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  return (
    <RNStatusBar
      style={colorMode}
      translucent={transparent}
      backgroundColor={transparent ? 'transparent' : theme.colors.surface}
    />
  );
}
