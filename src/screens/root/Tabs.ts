import config from '~constants/config';

import HomeNavigator from '~screens/home';
import ProfileNavigator from '~screens/profile';
import SettingsNavigator from '~screens/settings';
import DevNavigator from '~screens/dev';

const Tabs = [
  {
    title: 'Home',
    icon: 'home',
    screen: HomeNavigator,
  },
  {
    title: 'Profile',
    icon: 'userCicle',
    screen: ProfileNavigator,
  },
  {
    title: 'Settings',
    icon: 'graduationCap',
    screen: SettingsNavigator,
  },
];

if (config.APP_ENV === 'development') {
  Tabs.push({
    title: 'Dev',
    icon: 'eye',
    screen: DevNavigator,
  });
}

export default Tabs;
