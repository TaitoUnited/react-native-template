import { StatusBar as RNStatusBar } from 'expo-status-bar';

import { useColorMode } from '~services/color-mode';

export default function StatusBar({ transparent = false }) {
  const { colorMode } = useColorMode();

  return <RNStatusBar style={colorMode} translucent={transparent} />;
}
