import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import type { IconName } from '~components/uikit/Icon';
import { useTheme } from '~styles';
import { Icon, Text } from '~components/uikit';
import { useDefaultHeaderOptions } from '~utils/navigation';

type TabList = {
  id: any;
  title: string;
  iconFilled: IconName;
  iconOutlined: IconName;
}[];

export default function TabNavigator() {
  useLingui();
  const defaultHeaderOptions = useDefaultHeaderOptions();
  const theme = useTheme();
  const tabs: TabList = [
    {
      id: 'home',
      title: t`Home`,
      iconFilled: 'homeFilled',
      iconOutlined: 'homeOutlined',
    },
    {
      id: 'search',
      title: t`Search`,
      iconFilled: 'searchThick',
      iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: t`Profile`,
      iconFilled: 'userCicleFilled',
      iconOutlined: 'userCicleOutlined',
    },

    {
      id: 'settings',
      title: t`Settings`,
      iconFilled: 'settingsCogFilled',
      iconOutlined: 'settingsCogOutlined',
    },
  ];

  return (
    <Tabs
      screenOptions={{
        ...defaultHeaderOptions,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.muted3,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
      }}
    >
      {tabs.map(({ id, title, iconFilled, iconOutlined }) => (
        <Tabs.Screen
          key={title}
          name={id}
          options={{
            title: title,
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
    </Tabs>
  );
}
