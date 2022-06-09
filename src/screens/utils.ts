import { t } from '@lingui/macro';
import { StackNavigationOptions } from '@react-navigation/stack';

import {
  NavigationProp,
  useNavigation as _useNavigation,
} from '@react-navigation/native';

import { StackParamList } from './types';
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

export function useNavigation() {
  return _useNavigation<NavigationProp<StackParamList>>();
}
