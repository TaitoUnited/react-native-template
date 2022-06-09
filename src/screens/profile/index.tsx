import { t } from '@lingui/macro';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileDetailsScreen from './ProfileDetailsScreen';
import ProfileSummaryScreen from './ProfileSummaryScreen';
import Settings from '../settings';
import { useDefaultStackScreenOptions } from '~screens/utils';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="ProfileSummary"
        component={ProfileSummaryScreen}
        options={{ title: '' }}
      />
      <ProfileStack.Screen
        name="ProfileDetails"
        component={ProfileDetailsScreen}
        options={{ title: t`Profile` }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{ title: t`Settings` }}
      />
    </ProfileStack.Navigator>
  );
}
