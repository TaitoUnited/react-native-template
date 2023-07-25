import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import type { IconName } from '~components/uikit/Icon';
import type { ParamList } from '~screens/types';
import { useTheme } from '~styles';
import { Icon, Text } from '~components/uikit';
import HomeNavigator from '~screens/home';
import SearchsNavigator from '~screens/search';
import ProfileNavigator from '~screens/profile';
import SettingsNavigator from '~screens/settings';

const Tab = createBottomTabNavigator<ParamList>();

type TabList = {
  id: keyof ParamList;
  title: string;
  iconFilled: IconName;
  iconOutlined: IconName;
  screen: () => JSX.Element;
}[];

export default function TabNavigator() {
  useLingui();
  const theme = useTheme();
  const tabs: TabList = [
    {
      id: 'HomeStack',
      title: t`Home`,
      iconFilled: 'homeFilled',
      iconOutlined: 'homeOutlined',
      screen: HomeNavigator,
    },
    {
      id: 'SearchStack',
      title: t`Search`,
      iconFilled: 'searchThick',
      iconOutlined: 'search',
      screen: SearchsNavigator,
    },

    {
      id: 'ProfileStack',
      title: t`Profile`,
      iconFilled: 'userCicleFilled',
      iconOutlined: 'userCicleOutlined',
      screen: ProfileNavigator,
    },

    {
      id: 'SettingsStack',
      title: t`Settings`,
      iconFilled: 'settingsCogFilled',
      iconOutlined: 'settingsCogOutlined',
      screen: SettingsNavigator,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.muted3,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
      }}
    >
      {tabs.map(({ id, title, iconFilled, iconOutlined, screen }) => (
        <Tab.Screen
          key={title}
          name={id}
          component={screen}
          options={{
            tabBarItemStyle: {
              // On Android the label is too close to the bottom edge of the tab bar
              paddingBottom: Platform.OS === 'android' ? 4 : 0,
            },
            tabBarLabel: ({ focused }) => (
              <Text variant="caption" color={focused ? 'text' : 'textMuted'}>
                {title}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? iconFilled : iconOutlined}
                color={focused ? 'text' : 'textMuted'}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
