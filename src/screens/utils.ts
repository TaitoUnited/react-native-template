import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation as _useNavigation } from '@react-navigation/native';
import { t } from '@lingui/macro';

import { UseNavigationProp } from './types';
import { useTheme } from '~styles';

function useSharedOptions() {
  const theme = useTheme();

  const options = {
    headerStyle: {
      backgroundColor: theme.colors.background,
      borderBottomColor: theme.colors.muted3,
      borderBottomWidth: StyleSheet.hairlineWidth,
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
    },
    headerBackTitle: t`Back`,
    cardStyle: {
      backgroundColor: theme.colors.background,
    },
  };

  return screenOptions;
}

export function useNavigation() {
  return _useNavigation<UseNavigationProp>();
}
