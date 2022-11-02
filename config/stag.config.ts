import { Config } from './types';
import * as colors from '../src/design-system/colors';

export const config: Config = {
  appIdSuffix: '.dev', // NOTE: dev/test/stag share the same app id!
  iconImage: './src/design-system/assets/icon-stag.png',
  adaptiveIcon: {
    foregroundImage: './src/design-system/assets/adaptive-icon-stag.png',
    backgroundColor: colors.envStaging,
  },
  splash: {
    image: './src/design-system/assets/splash.png',
    backgroundColor: colors.envStaging,
  },
};
