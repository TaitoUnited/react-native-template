import { Config } from './types';
import * as colors from '../src/design-system/colors';

export const config: Config = {
  appIdSuffix: '.dev', // NOTE: dev/test/stag share the same app id!
  iconImage: './src/design-system/assets/icon-test.png',
  adaptiveIcon: {
    foregroundImage: './src/design-system/assets/adaptive-icon-test.png',
    backgroundColor: colors.envTest,
  },
  splash: {
    image: './src/design-system/assets/splash.png',
    backgroundColor: colors.envTest,
  },
};