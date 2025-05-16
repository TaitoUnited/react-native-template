import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = '808dbf9f-9986-4409-a52d-050e69d62397';
const PROJECT_SLUG = 'taito-template';
const OWNER = 'taito-united';

// App production config
const APP_NAME = 'Taito Template';
const BUNDLE_IDENTIFIER = 'com.taito.template';
const PACKAGE_NAME = 'com.taito.template';
const ICON = './src/design-system/assets/icon.png';
const ADAPTIVE_ICON = './src/design-system/assets/adaptive-icon.png';
const FAVICON = './src/design-system/assets/icon.png';
const SCHEME = 'taito-template';
export const BACKGROUND_COLOR = '#009a48'; // Corresponds to `colors.brand.brand`
export const SPLASHSCREEN = './src/design-system/assets/splash.png';

// Store links for app store review prompts (recommended for user-facing apps to help users leave reviews and avoid negative feedback in the stores)
const APP_STORE_URL = 'https://apps.apple.com/us/app/example/id1234567890';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.example';

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.APP_ENV);
  const {
    name,
    bundleIdentifier,
    icon,
    adaptiveIcon,
    packageName,
    scheme,
    ...rest
  } = getDynamicAppConfig(
    (process.env.APP_ENV as 'development' | 'preview' | 'production') ||
      'development'
  );

  return {
    ...config,
    name: name,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    owner: OWNER,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      appStoreUrl: APP_STORE_URL,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: BACKGROUND_COLOR,
      },
      edgeToEdgeEnabled: true,
      package: packageName,
      playStoreUrl: PLAY_STORE_URL,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    extra: {
      ...rest,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: FAVICON,
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
          image: SPLASHSCREEN,
          imageWidth: 1000,
          resizeMode: 'contain',
          backgroundColor: BACKGROUND_COLOR,
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
      [
        '@sentry/react-native/expo',
        {
          /**
           * _[CUSTOMIZE]_
           *
           * Create a project in sentry and customize these to match the project.
           */

          organization: 'taito-united',
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
  // eslint-disable-next-line lingui/no-unlocalized-strings
  return `
  # react-native-date-picker
-keep public class net.time4j.android.ApplicationStarter
-keep public class net.time4j.PrettyTime
`;
}

export type CustomConfig = {
  name: string;
  bundleIdentifier: string;
  packageName: string;
  icon: string;
  adaptiveIcon: string;
  scheme: string;
};

/** Add all the extra config values you want to expose to the app here.
 *
 * You can then access it with `import config from '~constants/config';`
 *  */
export type ExtraConfig = {
  apiUrl: string;
};

/** Dynamically configure the app based on the environment. */
export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production'
): CustomConfig & ExtraConfig => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
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
      scheme: `${SCHEME}-prev`,
      apiUrl: 'https://api.example.com',
    };
  }

  return {
    name: `(dev) ${APP_NAME}`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: './src/design-system/assets/icon.png',
    adaptiveIcon: './src/design-system/assets/adaptive-icon.png',
    scheme: `${SCHEME}-dev`,
    apiUrl: 'https://api.example.com',
  };
};
