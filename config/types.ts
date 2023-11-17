export type Config = {
  appEnv: 'dev' | 'test' | 'stag' | 'prod';
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
  appStoreUrl?: string;
  playStoreUrl?: string;
};
