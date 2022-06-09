import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import HomeScreen from './HomeScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        options={{ title: t`Home` }}
        component={HomeScreen}
      />
      {/* TODO: add other screens */}
    </HomeStack.Navigator>
  );
}
