import { ExpoConfig } from '@expo/config';
import { getConfig } from './utils';

/** ------------------------- NOTE: -------------------------
 * Do not commit `console.log` statements in this file!!!
 * It will break android builds because of the way we Expo resolves
 * the `index.js` file during the build process...
 ------------------------------------------------------------ */

const env = process.env.APP_ENV || 'dev';
const config = getConfig(env);
const appId = `com.taito.template${config.appIdSuffix}`;

const expoConfig: ExpoConfig = {
  slug: 'taito-template',
  name: 'Taito Template',
  version: '1.0.0',
  orientation: 'portrait',
  jsEngine: 'hermes',
  platforms: ['ios', 'android'],
  icon: config.iconImage,
  backgroundColor: '#000000', // root view background
  userInterfaceStyle: 'automatic',
  experiments: {
    tsconfigPaths: true,
  },
  splash: {
    resizeMode: 'contain',
    backgroundColor: config.splash.backgroundColor,
    image: config.splash.image,
  },
  android: {
    package: appId,
    adaptiveIcon: {
      foregroundImage: config.adaptiveIcon.foregroundImage,
      backgroundColor: config.adaptiveIcon.backgroundColor,
    },
    // Add more Android permissions here
    permissions: ['POST_NOTIFICATIONS'],
  },
  ios: {
    bundleIdentifier: appId,
    bitcode: false,
    config: {
      usesNonExemptEncryption: false,
    },
    /* -------------- Add iOS permission usage descriptions here --------------
    infoPlist: {
      NSCameraUsageDescription: 'This app uses the camera to scan QR-codes.',
    },
    ------------------------------------------------------------------------- */
  },
  extra: {
    ...config,
    eas: {
      projectId: 'a079aab5-fb32-474f-8efb-fb983606bc9a',
    },
  },
  plugins: [
    [
      './plugins/with-ios-settings',
      {
        teamId: 'EPATC4S9N2',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          buildToolsVersion: '33.0.0',
          minSdkVersion: 23,
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          extraProguardRules: getExtraProguardRules(),
        },
      },
    ],
  ],
};

// NOTE: we can't inline this to the plugin definition because the indendation would be wrong
function getExtraProguardRules() {
  return `
# react-native-fast-image
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

# react-native-device-info
-keep class com.google.android.gms.common.** {*;}

# react-native-date-picker
-keep public class net.time4j.android.ApplicationStarter
-keep public class net.time4j.PrettyTime
`;
}

export default expoConfig;
