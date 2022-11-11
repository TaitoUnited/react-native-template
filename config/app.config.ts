import { ExpoConfig } from '@expo/config';
import { getConfig } from './utils';

const env = process.env.APP_ENV || 'dev';
const config = getConfig(env);
const appId = `com.taito.template${config.appIdSuffix}`;

console.log(`→ Using ${env} config`);

const expoConfig: ExpoConfig = {
  slug: 'taito-template',
  name: 'Taito Template',
  version: '1.0.0',
  orientation: 'portrait',
  jsEngine: 'hermes',
  platforms: ['ios', 'android'],
  icon: config.iconImage,
  backgroundColor: '#000000', // root view background
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
    /* -------------- Add iOS permission usage descriptions here --------------
    infoPlist: {
      NSCameraUsageDescription: 'This app uses the camera to scan QR-codes.',
    },
    ------------------------------------------------------------------------- */
  },
  extra: config,
  plugins: [
    './plugins/with-appcenter-signing',
    [
      './plugins/with-react-native-permissions',
      // Add more iOS permissions here
      { pods: ['Notifications'] },
    ],
    [
      'expo-build-properties',
      { android: { extraProguardRules: getExtraProguardRules() } },
    ],
  ],
};

// NOTE: we can't inline this to the plugin definition because the indendation would be wrong
function getExtraProguardRules() {
  return `
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
`;
}

export default expoConfig;