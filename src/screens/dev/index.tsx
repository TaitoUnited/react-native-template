import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';
import { useCustomStackScreenOptions } from '~screens/utils';
import DrawerNavigator from '~screens/root/DrawerNavigator';

const DevStack = createStackNavigator();

export default function DevNavigator() {
  const screenOptions = useCustomStackScreenOptions(t`Components (dev only)`);

  return (
    <DevStack.Navigator screenOptions={screenOptions}>
      <DevStack.Screen
        name="DevScreen"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </DevStack.Navigator>
  );
}
