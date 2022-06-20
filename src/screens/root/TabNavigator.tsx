import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from '../home';
import ProfileNavigator from '../profile';
import SettingsNavigator from '../settings';
import { useTheme } from '~styles';
import { Icon } from '~components/uikit';
import DevNavigator from '~screens/dev';

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
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'graduationCapFilled' : 'graduationCapOutline'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DevTab"
        component={DevNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'eyeFilled' : 'eyeOutline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
