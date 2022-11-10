import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import ProfileScreen from './ProfileScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const Stack = createStackNavigator<ParamList>();

export default function ProfileNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Profile"
        options={{ title: t`Profile` }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
