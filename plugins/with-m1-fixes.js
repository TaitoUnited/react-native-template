const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode'); // prettier-ignore

function withM1Fixes(config) {
  return withDangerousMod(config, [
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
          # Fix building failures on M1
          config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = ''
`;
}

module.exports = withM1Fixes;
