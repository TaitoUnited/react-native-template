import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import BluetoothScreen from './BluetoothScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const BluetoothStack = createStackNavigator();

export default function BluetoothNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <BluetoothStack.Navigator screenOptions={screenOptions}>
      <BluetoothStack.Screen
        name="Bluetooth"
        options={{ title: t`Bluetooth` }}
        component={BluetoothScreen}
      />
    </BluetoothStack.Navigator>
  );
}
