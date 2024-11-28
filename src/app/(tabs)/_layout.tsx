import { msg } from '@lingui/macro';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomBar } from '~components/common/custom-bottom-bar/BottomBar';
import StoreReview from '~components/store-review/StoreReview';
import { Icon, Text } from '~components/uikit';
import type { IconName } from '~components/uikit/Icon';
import { useI18n } from '~services/i18n';
import { useTheme } from '~styles';

export type TabList = {
  id: string;
  title: string;
  iconFilled: IconName;
  iconOutlined: IconName;
}[];

/**
 * Determines whether to use a fully customizable bottom tab bar (`CustomBottomBar`)
 * or the default tab layout with minimal customization (`DefaultBottomBar`).
 *
 * Set `USE_CUSTOM_TABS` to `true` if the client requires a highly customizable tab bar (animations, unique styling, etc.).
 * Set it to `false` to use the default tab setup, which applies simpler, standard styling.
 *
 * Example: For a custom bottom bar based on specific branding needs, set `USE_CUSTOM_TABS = true`.
 */
const USE_CUSTOM_TABS = true;

export default function TabsLayout() {
  const { _ } = useI18n();

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
      {USE_CUSTOM_TABS ? (
        <CustomBottomBar tabs={tabs} theme={theme} />
      ) : (
        <DefaultBottomBar tabs={tabs} theme={theme} />
      )}
      <StoreReview />
    </>
  );
}

type BottomBarProps = {
  tabs: TabList;
  theme: ReturnType<typeof useTheme>;
};

function DefaultBottomBar({ tabs, theme }: BottomBarProps) {
  const { _ } = useI18n();
  const insets = useSafeAreaInsets();

  function renderTabIcon({
    focused,
    iconFilled,
    iconOutlined,
  }: {
    focused: boolean;
    iconFilled: IconName;
    iconOutlined: IconName;
  }) {
    return <Icon name={focused ? iconFilled : iconOutlined} color="text" />;
  }

  function renderBarLabel({
    focused,
    id,
    title,
  }: {
    focused: boolean;
    id: string;
    title: string;
  }) {
    return (
      <Text
        variant="bodyExtraSmall"
        color={focused ? 'text' : 'textMuted'}
        testID={id}
      >
        {title}
      </Text>
    );
  }

  return (
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
            tabBarAccessibilityLabel: _(msg`${title} tab`),
            tabBarItemStyle: {
              // On certain devices without insets, the tab bar is too close to the bottom of the screen
              paddingBottom: insets.bottom === 0 ? 4 : 0,
            },
            tabBarLabel: ({ focused }) =>
              renderBarLabel({ focused, id, title }),
            tabBarIcon: ({ focused }) =>
              renderTabIcon({ focused, iconFilled, iconOutlined }),
          }}
        />
      ))}
    </Tabs>
  );
}

function renderBottomBar(props: BottomTabBarProps & { tabs: TabList }) {
  return <BottomBar {...props} />;
}

function CustomBottomBar({ tabs, theme }: BottomBarProps) {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => renderBottomBar({ ...props, tabs })}
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
      }}
    >
      {tabs.map(({ id, title }) => (
        <Tabs.Screen key={title} name={id} options={{ title }} />
      ))}
    </Tabs>
  );
}
