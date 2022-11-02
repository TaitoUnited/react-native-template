import { NavigationProp } from '@react-navigation/native';
import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export type LoginParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  FoodTab: undefined;
  BotsTab: undefined;
  SettingsTab: undefined;
};

export type DrawersParamList = {
  HomeDrawers: undefined;
  TimerDrawers: undefined;
  QrScannerDrawers: undefined;
  BluetoothDrawers: undefined;
  MapsDrawers: undefined;
  PaymentDrawers: undefined;
  FileUploadDrawers: undefined;
  MessagingDrawers: undefined;
  FrisbeeDrawers: undefined;
};

export type StackParamList = LoginParamList;

export type ScreenName = keyof StackParamList;

export type StackScreenProps<T extends ScreenName> = RNStackScreenProps<
  StackParamList,
  T
>;

export type UseNavigationProp = NavigationProp<StackParamList>;
