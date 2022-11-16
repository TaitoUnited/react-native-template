import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import MenuListScreen from './MenuListScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const Stack = createStackNavigator<ParamList>();

export default function MenuListNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MenuList"
        options={{ title: t`MenuList` }}
        component={MenuListScreen}
      />
    </Stack.Navigator>
  );
}
