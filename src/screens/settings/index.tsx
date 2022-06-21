import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';
import SettingsSummaryScreen from './SettingsSummaryScreen';
import { useCustomStackScreenOptions } from '~screens/utils';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator() {
  const screenOptions = useCustomStackScreenOptions(t`Settings`);

  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name="SettingsHome"
        component={SettingsSummaryScreen}
      />
    </SettingsStack.Navigator>
  );
}
