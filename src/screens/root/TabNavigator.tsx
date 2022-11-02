import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerNavigator from './DrawerNavigator';

import { useTheme } from '~styles';
import { Icon } from '~components/uikit';
import { IconName } from '~components/uikit/Icon';
import type { TabParamList } from '~screens/types';

import FoodNavigator from '~screens/food';
import BotsNavigator from '~screens/bots';
import SettingsNavigator from '~screens/settings';

const Tab = createBottomTabNavigator<TabParamList>();

type TabList = {
  title: keyof TabParamList;
  iconFilled: IconName;
  iconOutlined: IconName;
  screen: () => JSX.Element;
}[];

const tabs: TabList = [
  {
    title: `HomeTab`,
    iconFilled: 'homeFilled',
    iconOutlined: 'homeOutlined',
    screen: DrawerNavigator,
  },
  {
    title: 'FoodTab',
    iconFilled: 'foodAppleFilled',
    iconOutlined: 'foodAppleOutlined',
    screen: FoodNavigator,
  },
  {
    title: 'BotsTab',
    iconFilled: 'commandLineFilled',
    iconOutlined: 'commandLineOutlined',
    screen: BotsNavigator,
  },
  {
    title: 'SettingsTab',
    iconFilled: 'settingsCogFilled',
    iconOutlined: 'settingsCogOutlined',
    screen: SettingsNavigator,
  },
];

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.text,
          borderTopWidth: 1,
        },
      }}
    >
      {tabs.map(({ title, iconFilled, iconOutlined, screen }) => (
        <Tab.Screen
          key={title}
          name={title}
          component={screen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? iconFilled : iconOutlined} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
