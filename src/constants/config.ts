import Constants from 'expo-constants';
import type { Config } from '../../config/types';

const config = Constants.manifest?.extra as Config;

export default config;
