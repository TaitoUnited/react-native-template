import { t } from '@lingui/macro';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation as _useNavigation } from '@react-navigation/native';

import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { UseNavigationProp } from './types';
import { useTheme } from '~styles';

function useSharedOptions() {
  const theme = useTheme();

  const options = {
    headerStyle: {
      backgroundColor: theme.colors.background,
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1,
    },
    headerLeftContainerStyle: {
      paddingLeft: theme.space.normal,
    },
    headerRightContainerStyle: {
      paddingRight: theme.space.normal,
    },
    headerTintColor: theme.colors.text,
    headerTitleStyle: {
      fontSize: theme.fontSizes.bodyBold,
      fontWeight: theme.fontWeights.bodyBold as any,
    },
  };

  return options;
}

export function useDefaultStackScreenOptions() {
  const theme = useTheme();
  const sharedOptions = useSharedOptions();

  const screenOptions: StackNavigationOptions = {
    ...sharedOptions,
    headerBackTitleStyle: {
      fontSize: theme.fontSizes.body,
      fontWeight: theme.fontWeights.body as any,
    },
    headerBackTitle: t`Back`,
    cardStyle: {
      backgroundColor: theme.colors.background,
    },
  };

  return screenOptions;
}

export function useDefaultDrawerScreenOptions() {
  const theme = useTheme();
  const sharedOptions = useSharedOptions();

  const screenOptions: DrawerNavigationOptions = {
    ...sharedOptions,
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

export function useDefaultStackScreenInDrawerOptions() {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return screenOptions;
}

export function useNavigation() {
  return _useNavigation<UseNavigationProp>();
}
