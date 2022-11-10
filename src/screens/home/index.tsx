import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import HomeScreen from './HomeScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const Stack = createStackNavigator<ParamList>();

export default function HomeNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        options={{ title: t`Home` }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
