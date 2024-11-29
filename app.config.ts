// https://docs.expo.dev/guides/typescript/#appconfigjs
import { type ExpoConfig } from '@expo/config';
import 'ts-node/register';

import { getConfig } from './config/utils';

/** ------------------------- NOTE: -------------------------
 * Do not commit `console.log` statements in this file!!!
 * It will break android builds because of the way we Expo resolves
 * the `index.tsx` file during the build process...
 ------------------------------------------------------------ */

const env = process.env.APP_ENV || 'dev';

const config = getConfig(env);
const appId = `com.taito.template${config.appIdSuffix ?? ''}`;

const expoConfig: ExpoConfig = {
  slug: 'taito-template',
  name: 'Taito Template', // eslint-disable-line lingui/no-unlocalized-strings
  scheme: config.scheme,
  owner: 'taito-united',
  version: '0.0.1',
  orientation: 'portrait',
  jsEngine: 'hermes',
  platforms: ['ios', 'android', 'web'], // Remove web if you don't need to support it
  icon: config.iconImage,
  newArchEnabled: true,
  backgroundColor: '#000000', // root view background
  userInterfaceStyle: 'automatic',
  android: {
    package: appId,
    playStoreUrl: config.playStoreUrl,
    adaptiveIcon: {
      foregroundImage: config.adaptiveIcon.foregroundImage,
      backgroundColor: config.adaptiveIcon.backgroundColor,
    },
    // Add more Android permissions here
    permissions: ['VIBRATE'],
  },
  ios: {
    bundleIdentifier: appId,
    supportsTablet: true, // Change this if your app supports tablets
    appStoreUrl: config.appStoreUrl,
    bitcode: false,
  },
  // Remove the `web` entry if you don't need to support it
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: config.iconImage,
  },
  extra: {
    ...config,
    eas: {
      projectId: '808dbf9f-9986-4409-a52d-050e69d62397',
    },
  },
  updates: {
    url: 'https://u.expo.dev/808dbf9f-9986-4409-a52d-050e69d62397',
  },
  // This is important for OTA updates to work properly!
  // https://docs.expo.dev/eas-update/runtime-versions/#fingerprint-runtime-version-policy
  runtimeVersion: {
    policy: 'fingerprint',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    ['expo-updates', { username: 'taito-united' }],
    [
      'expo-font',
      {
        fonts: [
          './src/design-system/fonts/Inter-Bold.ttf',
          './src/design-system/fonts/Inter-Medium.ttf',
          './src/design-system/fonts/Inter-Regular.ttf',
          './src/design-system/fonts/Inter-SemiBold.ttf',
        ],
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: config.splash.backgroundColor,
        image: config.splash.image,
        resizeMode: 'contain',
        // Uncomment to add splash screen dark mode
        // dark: {
        //   image: config.splash.darkImage,
        //   backgroundColor: config.splash.darkBackgroundColor
        // },
      },
    ],
    [
      'react-native-permissions',
      {
        // Add setup_permissions to your Podfile
        iosPermissions: [],
      },
    ],
    ['./plugins/with-ios-settings', { teamId: 'EPATC4S9N2' }],
    [
      'expo-build-properties',
      { android: { extraProguardRules: getExtraProguardRules() } },
    ],
  ],
};

// NOTE: we can't inline this to the plugin definition because the indendation would be wrong
function getExtraProguardRules() {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  return `
  # react-native-date-picker
-keep public class net.time4j.android.ApplicationStarter
-keep public class net.time4j.PrettyTime
`;
}

export default expoConfig;
