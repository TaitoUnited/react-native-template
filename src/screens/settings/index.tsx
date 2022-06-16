import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsSummaryScreen from './SettingsSummaryScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name="SettingsHome"
        component={SettingsSummaryScreen}
        options={{ title: '' }}
      />
    </SettingsStack.Navigator>
  );
}
