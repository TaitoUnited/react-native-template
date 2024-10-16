// https://docs.expo.dev/guides/typescript/#appconfigjs
import { ExpoConfig } from '@expo/config';
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
  name: 'Taito Template',
  scheme: config.scheme,
  owner: 'taito-united',
  version: '1.0.0',
  orientation: 'portrait',
  jsEngine: 'hermes',
  platforms: ['ios', 'android'],
  icon: config.iconImage,
  backgroundColor: '#000000', // root view background
  userInterfaceStyle: 'automatic',
  experiments: {
    tsconfigPaths: true,
    // typedRoutes: true, // Enable when it's possible to generate types for routes manually
  },
  splash: {
    resizeMode: 'contain',
    backgroundColor: config.splash.backgroundColor,
    image: config.splash.image,
  },
  android: {
    package: appId,
    playStoreUrl: config.playStoreUrl,
    adaptiveIcon: {
      foregroundImage: config.adaptiveIcon.foregroundImage,
      backgroundColor: config.adaptiveIcon.backgroundColor,
    },
    // Add more Android permissions here
    permissions: [],
  },
  ios: {
    bundleIdentifier: appId,
    appStoreUrl: config.appStoreUrl,
    bitcode: false,
    config: {
      usesNonExemptEncryption: false,
    },
    /* -------------- Add iOS permission usage descriptions here -------------- */
    infoPlist: {},
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
    policy: 'fingerprintExperimental',
  },
  plugins: [
    'expo-router',
    'expo-font',
    ['expo-updates', { username: 'taito-united' }],
    ['./plugins/with-ios-settings', { teamId: 'EPATC4S9N2' }],
    [
      'react-native-permissions',
      {
        // Add setup_permissions to your Podfile
        iosPermissions: [],
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          buildToolsVersion: '34.0.0',
          kotlinVersion: '1.6.21',
          minSdkVersion: 23,
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          extraProguardRules: getExtraProguardRules(),
        },
      },
    ],
  ],
};

// NOTE: we can't inline this to the plugin definition because the indendation would be wrong
function getExtraProguardRules() {
  return `
  # react-native-date-picker
-keep public class net.time4j.android.ApplicationStarter
-keep public class net.time4j.PrettyTime
`;
}

export default expoConfig;
