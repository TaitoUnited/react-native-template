import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoursesScreen from './CoursesScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const CoursesStack = createStackNavigator();

export default function CoursesNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <CoursesStack.Navigator screenOptions={screenOptions}>
      <CoursesStack.Screen name="Courses" component={CoursesScreen} />
      {/* TODO: add other screens */}
    </CoursesStack.Navigator>
  );
}
