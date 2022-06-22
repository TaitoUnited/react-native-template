import { t } from '@lingui/macro';
import { StackNavigationOptions } from '@react-navigation/stack';

import {
  NavigationProp,
  useNavigation as _useNavigation,
} from '@react-navigation/native';

import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { StackParamList } from './types';
import NavigationHeaderRight from './NavigationHeaderRight';
import { useTheme } from '~styles';
import { typography } from '~styles/utils';

export function useDefaultStackScreenOptions() {
  const theme = useTheme();

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: theme.colors.background,
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerLeftContainerStyle: {
      paddingLeft: theme.space.normal,
    },
    headerRightContainerStyle: {
      paddingRight: theme.space.normal,
    },

    headerTintColor: theme.colors.text,
    headerTitleStyle: { ...typography('$bodyBold') } as any,
    headerBackTitle: t`Back`,
    headerBackTitleStyle: { ...typography('$body') } as any,
  };

  return screenOptions;
}

export function useCustomStackScreenOptions(title: string) {
  const screenOptions = useDefaultStackScreenOptions();
  screenOptions.title = title;
  screenOptions.headerRight = NavigationHeaderRight;

  return screenOptions;
}

export function useDefaultDrawerScreenOptions() {
  const theme = useTheme();

  const screenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerLeftContainerStyle: {
      paddingLeft: theme.space.normal,
    },
    headerRightContainerStyle: {
      paddingRight: theme.space.normal,
    },

    headerTintColor: theme.colors.text,
    headerTitleStyle: { ...typography('$bodyBold') } as any,
    drawerStyle: {
      backgroundColor: theme.colors.background,
    },
    drawerActiveTintColor: theme.colors.text,
    drawerActiveBackgroundColor: theme.colors.hoverHighlight,
    drawerInactiveTintColor: theme.colors.text,
    drawerInactiveBackgroundColor: theme.colors.background,
  };

  return screenOptions;
}

export function useCustomDrawerScreenOptions() {
  const screenOptions = useDefaultDrawerScreenOptions();
  screenOptions.headerRight = NavigationHeaderRight;

  return screenOptions;
}

export function useNavigation() {
  return _useNavigation<NavigationProp<StackParamList>>();
}
