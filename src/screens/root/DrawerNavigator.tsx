import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { drawerOptions } from '~screens/dev/DevDrawers';
// Default screen, filtered out from the list of stories
import { WelcomeScreen } from '~components/uikit/StoriesUtils';

const Drawer = createDrawerNavigator();

export type DrawerOptions = {
  label: string;
  component: React.FC;
}[];

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName={'00 - Getting started'}>
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
