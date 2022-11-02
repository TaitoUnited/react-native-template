import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import HomeScreen from './HomeScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        options={{ title: t`Home` }}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}
