import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import FoodScreen from './FoodScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const FoodStack = createStackNavigator();

export default function FoodNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <FoodStack.Navigator screenOptions={screenOptions}>
      <FoodStack.Screen
        name="Food"
        options={{ title: t`Food` }}
        component={FoodScreen}
      />
    </FoodStack.Navigator>
  );
}
