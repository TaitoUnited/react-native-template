const fs = require('fs');
const path = require('path');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode'); // prettier-ignore

const {
  withDangerousMod,
  withXcodeProject,
  withPlugins,
} = require('@expo/config-plugins');

function withDevelopmentTeam(c, teamId) {
  return withXcodeProject(c, (config) => {
    const project = config.modResults;
    const configurations = project.pbxXCBuildConfigurationSection();

    for (const key in configurations) {
      const configuration = configurations[key];

      if (configuration.buildSettings) {
        configuration.buildSettings.DEVELOPMENT_TEAM = `"${teamId}"`;
      }
    }

    return config;
  });
}

function withPodfileSettings(c) {
  return withDangerousMod(c, [
    'ios',
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );

      const contents = fs.readFileSync(filePath, 'utf-8');

      const result = mergeContents({
        tag: 'm1-fixes',
        src: contents,
        newSrc: getPodfileContent(),
        anchor: /resource_bundle_target\.build_configurations\.each/,
        offset: 1,
        comment: '#',
      });

      fs.writeFileSync(filePath, result.contents);

      return config;
    },
  ]);
}

function getPodfileContent() {
  return `
          # Fix iOS building issues
          config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
          config.build_settings['ENABLE_BITCODE'] = 'NO'
`;
}

function withIosSettings(config, { teamId = '' }) {
  if (!teamId) {
    throw new Error(`Missing Apple Development Team ID!`);
  }

  return withPlugins(config, [
    [withDevelopmentTeam, teamId],
    [withPodfileSettings],
  ]);
}

module.exports = withIosSettings;
