import Constants from 'expo-constants';

import { type AppConfig } from '../../app.config.types';

const config = Constants.expoConfig?.extra as AppConfig;

export default config;
