import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from '@lingui/macro';

import type { IconName } from '~components/uikit/Icon';
import type { ParamList } from '~screens/types';
import { useTheme } from '~styles';
import { Icon } from '~components/uikit';
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
        tabBarShowLabel: false,
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
            tabBarLabel: title,
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? iconFilled : iconOutlined} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
