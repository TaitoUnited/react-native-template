/* eslint-disable lingui/no-unlocalized-strings */
import { useFonts } from 'expo-font';

import InterBold from '../design-system/fonts/Inter-Bold.ttf';
import InterMedium from '../design-system/fonts/Inter-Medium.ttf';
import InterRegular from '../design-system/fonts/Inter-Regular.ttf';
import InterSemiBold from '../design-system/fonts/Inter-SemiBold.ttf';

export function useFontsReady() {
  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': InterRegular,
    'Inter-SemiBold': InterSemiBold,
    'Inter-Medium': InterMedium,
    'Inter-Bold': InterBold,
  });
  if (error) console.log('Error loading fonts', error);

  return fontsLoaded;
}
