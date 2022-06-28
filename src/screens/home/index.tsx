import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import HomeScreen from './HomeScreen';
import { useCustomStackScreenOptions } from '~screens/utils';

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
  const screenOptions = useCustomStackScreenOptions(t`Home`);

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* TODO: add other screens */}
    </HomeStack.Navigator>
  );
}
