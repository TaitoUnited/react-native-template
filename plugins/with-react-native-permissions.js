const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode'); // prettier-ignore

function withReactNativePermissions(config, opts = {}) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );

      const contents = fs.readFileSync(filePath, 'utf-8');
      const pods = opts.pods || [];

      const result = mergeContents({
        tag: 'react-native-permissions',
        src: contents,
        newSrc: getPodfileContent(pods),
        anchor: /use_native_modules/,
        offset: 0,
        comment: '#',
      });

      fs.writeFileSync(filePath, result.contents);

      return config;
    },
  ]);
}

function getPodfileContent(pods) {
  return `
  permissions_path = '../node_modules/react-native-permissions/ios'
  ${pods
    .map(
      (pod) => `pod 'Permission-${pod}', :path => "#{permissions_path}/${pod}"`
    )
    .join('\n  ')}
`;
}

module.exports = withReactNativePermissions;
