import { msg } from '@lingui/macro';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StoreReview from '~components/store-review/StoreReview';
import { Icon, Text } from '~components/uikit';
import type { IconName } from '~components/uikit/Icon';
import { useI18n } from '~services/i18n';
import { useTheme } from '~styles';

type TabList = {
  id: string;
  title: string;
  iconFilled: IconName;
  iconOutlined: IconName;
}[];

export default function TabsLayout() {
  const { _ } = useI18n();
  const insets = useSafeAreaInsets();

  const theme = useTheme();
  const tabs: TabList = [
    {
      id: 'home',
      title: _(msg`Home`),
      iconFilled: 'homeFilled',
      iconOutlined: 'home',
    },
    {
      id: 'search',
      title: _(msg`Search`),
      iconFilled: 'search',
      iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: _(msg`Profile`),
      iconFilled: 'personCircleFilled',
      iconOutlined: 'personCircle',
    },

    {
      id: 'settings',
      title: _(msg`Settings`),
      iconFilled: 'settingsFilled',
      iconOutlined: 'settings',
    },
  ];

  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerBackgroundContainerStyle: {
            borderBottomColor: theme.colors.line3,
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyBold,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.line3,
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
                // On certain devices without insets, the tab bar is too close to the bottom of the screen
                paddingBottom: insets.bottom === 0 ? 4 : 0,
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
