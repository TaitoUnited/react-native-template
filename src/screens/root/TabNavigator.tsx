import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from '../home';
import ProfileNavigator from '../profile';
import { useTheme } from '~styles';
import { Icon } from '~components/uikit';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.elevated,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'homeFilled' : 'homeOutline'} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'userCicleFilled' : 'userCicleOutline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
