import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import SettingsScreen from './SettingsScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const SettingsStack = createStackNavigator<ParamList>();

export default function SettingsNavigator() {
  useLingui();
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name="Settings"
        options={{ title: t`Settings` }}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}
