export type AppEnv = 'development' | 'preview' | 'production';

export type CustomConfig = {
  name: string;
  bundleIdentifier: string;
  packageName: string;
  icon: string;
  adaptiveIcon: string;
  backgroundColor: string;
  splashscreen: string;
  scheme: string;
};

export type ExtraConfig = {
  appEnv: AppEnv;
  apiUrl: string;
};

export type AppConfig = CustomConfig & ExtraConfig;
