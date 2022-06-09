import { StackScreenProps as RegularStackScreenProps } from '@react-navigation/stack';
import { Advertisement } from '~components/adverts/AdvertCard';
import { LocalizedProfile } from '~graphql/generated';

// Key is the name of the screen and the value is the params
export type StackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSummary: undefined;
  Settings: undefined;
  ProfileDetails: { profile: Omit<LocalizedProfile, 'user'> };
  ProfileUpdate: { profile: Omit<LocalizedProfile, 'user'> };
  AdvertDetails: { advert: Advertisement };
};

export type ScreenName = keyof StackParamList;

export type StackScreenProps<T extends ScreenName> = RegularStackScreenProps<
  StackParamList,
  T
>;
