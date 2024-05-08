import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import StoreReview from '~components/store-review/StoreReview';
import type { IconName } from '~components/uikit/Icon';
import { useTheme } from '~styles';
import { Icon, Text } from '~components/uikit';
import { useDefaultHeaderOptions } from '~utils/navigation';

type TabList = {
  id: string;
  title: string;
  iconFilled: IconName;
  iconOutlined: IconName;
}[];

export default function TabsLayout() {
  /**
   * Note: useLingui is called in root _layout, and it is passed down to all children.
   * Here, the useLingui hook is necessary to make the t macro work in the tab bar and header.
   * It is the only place that needs that addition, not sure why.
   */
  useLingui();

  const theme = useTheme();
  const defaultHeaderOptions = useDefaultHeaderOptions();
  const tabs: TabList = [
    {
      id: 'home',
      title: t`Home`,
      iconFilled: 'homeFilled',
      iconOutlined: 'home',
    },
    {
      id: 'search',
      title: t`Search`,
      iconFilled: 'search',
      iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: t`Profile`,
      iconFilled: 'personCircleFilled',
      iconOutlined: 'personCircle',
    },

    {
      id: 'settings',
      title: t`Settings`,
      iconFilled: 'settingsFilled',
      iconOutlined: 'settings',
    },
  ];

  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          ...defaultHeaderOptions,
          tabBarStyle: {
            backgroundColor: theme.colors.surfaceHover,
            borderTopColor: theme.colors.neutral3,
            borderTopWidth: StyleSheet.hairlineWidth,
          },
        }}
      >
        {tabs.map(({ id, title, iconFilled, iconOutlined }) => (
          <Tabs.Screen
            key={title}
            name={id}
            options={{
              title,
              tabBarItemStyle: {
                // On Android the label is too close to the bottom edge of the tab bar
                paddingBottom: Platform.OS === 'android' ? 4 : 0,
              },
              tabBarLabel: ({ focused }) => (
                <Text
                  variant="bodyExtraSmall"
                  color={focused ? 'text' : 'textMuted'}
                  testID={id}
                >
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
      <StoreReview />
    </>
  );
}
