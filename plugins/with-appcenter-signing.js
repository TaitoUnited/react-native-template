const { withAppBuildGradle } = require('@expo/config-plugins');

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

module.exports = withAndroidSigning;
