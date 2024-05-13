import { t } from '@lingui/macro';
import { NavigationState, PartialState } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { useTheme } from '~styles';

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string | undefined {
  if (state.index === undefined) return undefined;
  const route = state.routes[state.index];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

export function useDefaultStackScreenOptions() {
  const theme = useTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.colors.surface,
    },
    headerTintColor: theme.colors.text,
    headerTitleStyle: {
      fontSize: theme.fontSizes.bodyBold,
    },
    headerBackTitleStyle: {
      fontSize: theme.fontSizes.body,
    },
    headerBackTitle: t`Back`,
  };

  return screenOptions;
}

export function useHeaderOptions(
  options: StackNavigationOptions,
  deps: any[] = []
) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(options);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
