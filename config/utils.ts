import { config as devConfig } from './dev.config';
import { config as prodConfig } from './prod.config';
import { config as testConfig } from './test.config';

export function getConfig(env: string) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    case 'prod':
      return prodConfig;
    default:
      throw new Error(
        `Invalid app env: ${env}! Must be one of 'dev', 'test' or 'prod'.`
      );
  }
}
