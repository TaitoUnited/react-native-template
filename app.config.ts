import type { ConfigContext, ExpoConfig } from 'expo/config';

import type { AppConfig, AppEnv } from './app.config.types';
import { version } from './package.json';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = '808dbf9f-9986-4409-a52d-050e69d62397';
const PROJECT_SLUG = 'taito-template';
const OWNER = 'taito-united';

const APP_NAME = 'Taito Template';
const BUNDLE_IDENTIFIER = 'com.taito.template';
const PACKAGE_NAME = 'com.taito.template';
const SCHEME = 'taito-template';

const ICON = './src/design-system/assets/icon.png';
const ADAPTIVE_ICON = './src/design-system/assets/adaptive-icon.png';
const SPLASHSCREEN = './src/design-system/assets/splash.png';
const BACKGROUND_COLOR = '#009a48'; // Corresponds to `colors.brand.brand`

// Store links for app store review prompts (recommended for user-facing apps to help users leave reviews and avoid negative feedback in the stores)
const APP_STORE_URL = 'https://apps.apple.com/us/app/example/id1234567890';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.example';

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = (process.env.APP_ENV as AppEnv) || 'development';
  const customConfig = getDynamicAppConfig(env);
  console.log('⚙️ Building app for environment:', env);

  return {
    ...config,
    name: customConfig.name,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    owner: OWNER,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: customConfig.icon,
    scheme: customConfig.scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: customConfig.bundleIdentifier,
      appStoreUrl: APP_STORE_URL,
      config: {
        usesNonExemptEncryption: false,
      },
      infoPlist: {},
    },
    android: {
      adaptiveIcon: {
        foregroundImage: customConfig.adaptiveIcon,
        backgroundColor: customConfig.backgroundColor,
      },
      edgeToEdgeEnabled: true,
      package: customConfig.packageName,
      playStoreUrl: PLAY_STORE_URL,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    extra: {
      ...customConfig,
      eas: { projectId: EAS_PROJECT_ID },
    },
    plugins: [
      'expo-router',
      'expo-localization',
      ['expo-updates', { username: OWNER }],
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
          image: customConfig.splashscreen,
          imageWidth: 1000,
          resizeMode: 'contain',
          backgroundColor: customConfig.backgroundColor,
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
      'react-native-edge-to-edge',
      [
        'expo-build-properties',
        { android: { extraProguardRules: getExtraProguardRules() } },
      ],
      [
        '@sentry/react-native/expo',
        {
          /**
           * _[CUSTOMIZE]_
           *
           * Create a project in sentry and customize these to match the project.
           */
          organization: OWNER,
          project: 'react-native',
          url: 'https://sentry.io/',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};

// NOTE: we can't inline this to the plugin definition because the indendation would be wrong
function getExtraProguardRules() {
  return `
  # react-native-date-picker
-keep public class net.time4j.android.ApplicationStarter
-keep public class net.time4j.PrettyTime
`;
}

/** Dynamically configure the app based on the environment. */
const getDynamicAppConfig = (environment: AppEnv): AppConfig => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      backgroundColor: BACKGROUND_COLOR,
      splashscreen: SPLASHSCREEN,
      scheme: SCHEME,
      appEnv: environment,
      apiUrl: 'https://api.example.com',
    };
  }

  if (environment === 'preview') {
    return {
      name: `(prev) ${APP_NAME}`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './src/design-system/assets/icon-test.png',
      adaptiveIcon: './src/design-system/assets/adaptive-icon-test.png',
      backgroundColor: BACKGROUND_COLOR,
      splashscreen: SPLASHSCREEN,
      scheme: `${SCHEME}-prev`,
      appEnv: environment,
      apiUrl: 'https://api.example.com',
    };
  }

  return {
    name: `(dev) ${APP_NAME}`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    backgroundColor: BACKGROUND_COLOR,
    splashscreen: SPLASHSCREEN,
    scheme: `${SCHEME}-dev`,
    appEnv: environment,
    apiUrl: 'https://api.example.com',
  };
};
