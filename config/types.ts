export type Config = {
  appEnv: 'dev' | 'test' | 'prod';
  scheme: string;
  apiUrl: string;
  appIdSuffix?: string;
  iconImage: string;
  adaptiveIcon: {
    backgroundColor: string;
    foregroundImage: string;
  };
  splash: {
    backgroundColor: string;
    image: string;
  };
  appStoreUrl?: string; // You can safely remove this if you do not use the Store Review feature
  playStoreUrl?: string; // You can safely remove this if you do not use the Store Review feature
};
