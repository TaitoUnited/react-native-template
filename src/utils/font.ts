import { useFonts } from 'expo-font';

export function useFontsReady() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../design-system/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../design-system/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../design-system/fonts/Inter-Bold.ttf'),
  });

  return fontsLoaded;
}
