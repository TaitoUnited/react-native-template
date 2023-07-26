const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { withDangerousMod } = require('@expo/config-plugins');

const CONFIG_PATH = './reactNativePermissionsIOS.json';

function withIosPermissions(c, opts = {}) {
  return withDangerousMod(c, [
    'ios',
    async (config) => {
      const permissions = opts.permissions || [];

      fs.writeFileSync(
        path.resolve(config.modRequest.projectRoot, CONFIG_PATH),
        JSON.stringify(permissions)
      );

      execSync('npx react-native setup-ios-permissions');

      return config;
    },
  ]);
}

module.exports = withIosPermissions;
