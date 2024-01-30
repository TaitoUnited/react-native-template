import { Config } from './types';
import * as colors from '../src/design-system/colors';

export const config: Config = {
  appEnv: 'dev',
  apiUrl: 'https://api.example.com',
  appIdSuffix: '.dev', // NOTE: dev/test/stag share the same app id!
  iconImage: './src/design-system/assets/icon.png',
  adaptiveIcon: {
    foregroundImage: './src/design-system/assets/adaptive-icon.png',
    backgroundColor: colors.light.primary,
  },
  splash: {
    image: './src/design-system/assets/splash.png',
    backgroundColor: colors.light.primary,
  },
  appStoreUrl: 'https://apps.apple.com/us/app/example/id1234567890',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.example',
};
