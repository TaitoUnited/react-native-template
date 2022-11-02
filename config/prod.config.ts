import { Config } from './types';
import * as colors from '../src/design-system/colors';

export const config: Config = {
  iconImage: './src/design-system/assets/icon.png',
  adaptiveIcon: {
    foregroundImage: './src/design-system/assets/adaptive-icon.png',
    backgroundColor: colors.light.primary,
  },
  splash: {
    image: './src/design-system/assets/splash.png',
    backgroundColor: colors.light.primary,
  },
};
