import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import MessagingScreen from './MessagingScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const MessagingStack = createStackNavigator();

export default function MessagingNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <MessagingStack.Navigator screenOptions={screenOptions}>
      <MessagingStack.Screen
        name="Messaging"
        options={{ title: t`Messaging` }}
        component={MessagingScreen}
      />
    </MessagingStack.Navigator>
  );
}
