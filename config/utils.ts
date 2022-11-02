import { config as devConfig } from './dev.config';
import { config as testConfig } from './test.config';
import { config as stagConfig } from './stag.config';
import { config as prodConfig } from './prod.config';

export function getConfig(env: string) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    case 'stag':
      return stagConfig;
    case 'prod':
      return prodConfig;
    default:
      throw new Error(
        `Invalid app env: ${env}! Must be one of 'dev', 'test', 'stag' or 'prod'.`
      );
  }
}
