const { withAppBuildGradle, withPlugins } = require('@expo/config-plugins');
const { default: withAppCenterConfiguration } = require('expo-appcenter');
const fs = require('fs');

function withAndroidSigning(config) {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = setAppCenterSigning(
        config.modResults.contents
      );
    } else {
      throw new Error(`Cannot set signing config if gradle is not groovy`);
    }
    return config;
  });
}

const appCenterSigning = `
            // with-appcenter-signing
            if (!System.getenv('APPCENTER_BUILD_ID')) {
                signingConfig signingConfigs.debug
            }
`;

function setAppCenterSigning(buildGradle) {
  const pattern = /with-appcenter-signing/g;

  if (buildGradle.match(pattern)) {
    return buildGradle;
  }

  return buildGradle.replaceAll(
    'signingConfig signingConfigs.debug',
    appCenterSigning
  );
}

const plistTemplate = (appSecret) => `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>AppSecret</key>
    <string>${appSecret}</string>
    </dict>
</plist>
`;

const jsonTemplate = (appSecret) => JSON.stringify({ app_secret: appSecret });

const JSON_CONFIG_PATH = './config/appcenter-config.json';
const PLIST_CONFIG_PATH = './config/appcenter-config.plist';

function withAddAppCenterConfigs(config, appSecret) {
  fs.writeFileSync(JSON_CONFIG_PATH, jsonTemplate(appSecret));
  fs.writeFileSync(PLIST_CONFIG_PATH, plistTemplate(appSecret));
  return config;
}

function withAppCenter(config, { appSecret = '' }) {
  if (!appSecret) {
    throw new Error(`Missing App Center app secret!`);
  }

  return withPlugins(config, [
    [withAddAppCenterConfigs, appSecret],
    [withAndroidSigning],
    [
      withAppCenterConfiguration,
      {
        androidAppCenterPath: JSON_CONFIG_PATH,
        iosAppCenterPath: PLIST_CONFIG_PATH,
      },
    ],
  ]);
}

module.exports = withAppCenter;
