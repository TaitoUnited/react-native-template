const fs = require('fs');
const path = require('path');
const { default: withAppCenterConfiguration } = require('expo-appcenter');

const {
  withAppBuildGradle,
  withPlugins,
  withDangerousMod,
} = require('@expo/config-plugins');

function withAndroidSigning(c) {
  return withAppBuildGradle(c, (config) => {
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

const jsonTemplate = (appSecret) => JSON.stringify({ app_secret: appSecret });
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

const JSON_CONFIG_PATH = './config/appcenter-config.json';
const PLIST_CONFIG_PATH = './config/appcenter-config.plist';

function withAppCenterConfigJson(c, appSecret) {
  return withDangerousMod(c, [
    'android',
    (config) => {
      fs.writeFileSync(
        path.resolve(config.modRequest.projectRoot, JSON_CONFIG_PATH),
        jsonTemplate(appSecret)
      );
      return config;
    },
  ]);
}

function withAppCenterConfigPlist(c, appSecret) {
  return withDangerousMod(c, [
    'ios',
    (config) => {
      fs.writeFileSync(
        path.resolve(config.modRequest.projectRoot, PLIST_CONFIG_PATH),
        plistTemplate(appSecret)
      );
      return config;
    },
  ]);
}

function withAppCenter(config, { appSecret = '' }) {
  if (!appSecret) {
    throw new Error(`Missing App Center app secret!`);
  }

  return withPlugins(config, [
    [withAndroidSigning],
    [
      withAppCenterConfiguration,
      {
        androidAppCenterPath: JSON_CONFIG_PATH,
        iosAppCenterPath: PLIST_CONFIG_PATH,
      },
    ],
    [withAppCenterConfigJson, appSecret],
    [withAppCenterConfigPlist, appSecret],
  ]);
}

module.exports = withAppCenter;
