import { StatusBar as RNStatusBar } from 'expo-status-bar';
import { UnistylesRuntime } from 'react-native-unistyles';

export default function StatusBar({ transparent = false }) {
  return (
    <RNStatusBar
      style={UnistylesRuntime.colorScheme === 'dark' ? 'light' : 'dark'}
      translucent={transparent}
    />
  );
}
