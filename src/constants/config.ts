import Config from 'react-native-config';

const config = {
  APP_ENV: Config.APP_ENV,
  API_URL: Config.API_URL,
  TERMS_OF_SERVICE_URL: 'https://en.wikipedia.org/wiki/Terms_of_service', // TODO: replace with real url
  PRIVACY_POLICY_URL: 'https://en.wikipedia.org/wiki/Privacy_policy/', // TODO: replace with real url
  PLACEHOLDER_MODE: Config.PLACEHOLDER_MODE === 'true',
};

export default config;
