import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Tabs from './Tabs';
import { useTheme } from '~styles';
import { Icon, Stack } from '~components/uikit';
import ColorModeButton from '~components/common/ColorModeButton';
import { LanguageSelectTopBar } from '~components/settings/LanguageSelect';
import { IconName } from '~components/uikit/Icon/Icon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerRight: () => (
          <Stack axis="x" spacing="normal">
            <ColorModeButton />
            <LanguageSelectTopBar />
          </Stack>
        ),

        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.elevated,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
      }}
    >
      {Tabs.map(({ title, icon, screen }) => (
        <Tab.Screen
          key={`${title}Tab`}
          name={`${title}Tab`}
          component={screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name={`${icon}${focused ? 'Filled' : 'Outline'}` as IconName}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
