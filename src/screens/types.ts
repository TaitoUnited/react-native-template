import { StackScreenProps as RegularStackScreenProps } from '@react-navigation/stack';

// Key is the name of the screen and the value is the params
export type StackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSummary: undefined;
  Settings: undefined;
};

export type ScreenName = keyof StackParamList;

export type StackScreenProps<T extends ScreenName> = RegularStackScreenProps<
  StackParamList,
  T
>;
