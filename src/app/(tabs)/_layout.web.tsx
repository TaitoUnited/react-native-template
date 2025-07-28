import { useLingui } from '@lingui/react/macro';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Icon, type IconName } from '~components/uikit/Icon';

import { type TabList as DrawerList } from './_layout';

export default function DrawerLayout() {
  const { t } = useLingui();
  const { theme } = useUnistyles();

  // Note: the items are intentionally 'duplicated' from the tabs list as we assume they will differ from each other in a real project.
  const drawerItems: DrawerList = [
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

  function renderDrawerIcon({
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

  return (
    <Drawer
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
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      {drawerItems.map(({ id, title, iconFilled, iconOutlined }) => (
        <Drawer.Screen
          key={title}
          name={id}
          options={{
            title,
            drawerLabel: title,
            drawerActiveTintColor: theme.colors.text,
            drawerItemStyle: {
              borderRadius: theme.radii.regular,
            },
            drawerIcon: ({ focused }) =>
              renderDrawerIcon({ focused, iconFilled, iconOutlined }),
          }}
        />
      ))}
    </Drawer>
  );
}
