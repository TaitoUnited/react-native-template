import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DevScreen from './DevScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const DevStack = createStackNavigator();

export default function DevNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <DevStack.Navigator screenOptions={screenOptions}>
      <DevStack.Screen
        name="DevHome"
        component={DevScreen}
        options={{
          headerTitle: 'Components (dev only)',
        }}
      />
    </DevStack.Navigator>
  );
}
