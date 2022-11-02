import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import FrisbeeScreen from './FrisbeeScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const FrisbeeStack = createStackNavigator();

export default function FrisbeeNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <FrisbeeStack.Navigator screenOptions={screenOptions}>
      <FrisbeeStack.Screen
        name="Frisbee"
        options={{ title: t`Frisbee` }}
        component={FrisbeeScreen}
      />
    </FrisbeeStack.Navigator>
  );
}
