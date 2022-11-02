import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import BotsScreen from './BotsScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const BotsStack = createStackNavigator();

export default function BotsNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <BotsStack.Navigator screenOptions={screenOptions}>
      <BotsStack.Screen
        name="Bots"
        options={{ title: t`Bots` }}
        component={BotsScreen}
      />
    </BotsStack.Navigator>
  );
}
