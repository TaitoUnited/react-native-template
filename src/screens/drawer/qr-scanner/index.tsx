import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import QrScannerScreen from './QrScannerScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const QrScannerStack = createStackNavigator();

export default function QrScannerNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <QrScannerStack.Navigator screenOptions={screenOptions}>
      <QrScannerStack.Screen
        name="QrScanner"
        options={{ title: t`QrScanner` }}
        component={QrScannerScreen}
      />
    </QrScannerStack.Navigator>
  );
}
