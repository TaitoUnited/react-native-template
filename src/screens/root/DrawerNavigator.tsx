import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerOptions } from '~screens/dev/DevDrawers';
import { useCustomDrawerScreenOptions } from '~screens/utils';
// Default screen, filtered out from the list of stories
import { WelcomeScreen } from '~components/uikit/StoriesUtils';

const Drawer = createDrawerNavigator();

export type DrawerOptions = {
  label: string;
  component: React.FC;
}[];

export default function DrawerNavigator() {
  const screenOptions = useCustomDrawerScreenOptions();

  return (
    <Drawer.Navigator
      initialRouteName={'00 - Getting started'}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name={'00 - Getting started'} component={WelcomeScreen} />
      {drawerOptions.map((option: DrawerOptions[0]) => (
        <Drawer.Screen
          key={option.label}
          name={option.label}
          component={option.component}
        />
      ))}
    </Drawer.Navigator>
  );
}
