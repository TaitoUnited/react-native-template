import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import TimerScreen from './TimerScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const TimerStack = createStackNavigator();

export default function TimerNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <TimerStack.Navigator screenOptions={screenOptions}>
      <TimerStack.Screen
        name="Timer"
        options={{ title: t`Timer` }}
        component={TimerScreen}
      />
    </TimerStack.Navigator>
  );
}
