import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import MapsScreen from './MapsScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const MapsStack = createStackNavigator();

export default function MapsNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <MapsStack.Navigator screenOptions={screenOptions}>
      <MapsStack.Screen
        name="Maps"
        options={{ title: t`Maps` }}
        component={MapsScreen}
      />
    </MapsStack.Navigator>
  );
}
