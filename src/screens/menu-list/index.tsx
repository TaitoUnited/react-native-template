import { createStackNavigator } from '@react-navigation/stack';

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
        options={({ route }) => ({ title: route.params.title })}
        component={MenuListScreen}
      />
    </Stack.Navigator>
  );
}
