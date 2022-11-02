import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import PaymentScreen from './PaymentScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const PaymentStack = createStackNavigator();

export default function PaymentNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <PaymentStack.Navigator screenOptions={screenOptions}>
      <PaymentStack.Screen
        name="Payment"
        options={{ title: t`Payment` }}
        component={PaymentScreen}
      />
    </PaymentStack.Navigator>
  );
}
