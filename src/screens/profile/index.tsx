import { t } from '@lingui/macro';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileSummaryScreen from './ProfileSummaryScreen';
import { useCustomStackScreenOptions } from '~screens/utils';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator() {
  const screenOptions = useCustomStackScreenOptions(t`Profile`);

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="ProfileSummary"
        component={ProfileSummaryScreen}
      />
    </ProfileStack.Navigator>
  );
}
