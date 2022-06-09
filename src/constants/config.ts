import Config from 'react-native-config';

const config = {
  APP_ENV: Config.APP_ENV,
  API_URL: Config.API_URL,
  TERMS_OF_SERVICE_URL:
    'https://faces.helsinkicasting.com/henkilotietojen-kasittely-ja-palvelun-kayttoehdot/',
  PRIVACY_POLICY_URL:
    'https://faces.helsinkicasting.com/henkilotietojen-kasittely-ja-palvelun-kayttoehdot/',
  PLACEHOLDER_MODE: Config.PLACEHOLDER_MODE === 'true',
};

export default config;
