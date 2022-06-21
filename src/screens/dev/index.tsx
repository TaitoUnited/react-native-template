import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';
import DevScreen from './DevScreen';
import { useCustomStackScreenOptions } from '~screens/utils';

const DevStack = createStackNavigator();

export default function DevNavigator() {
  const screenOptions = useCustomStackScreenOptions(t`Components (dev only)`);

  return (
    <DevStack.Navigator screenOptions={screenOptions}>
      <DevStack.Screen name="DevHome" component={DevScreen} />
    </DevStack.Navigator>
  );
}
