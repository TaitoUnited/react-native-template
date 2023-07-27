import { useEffect } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { t } from '@lingui/macro';

import { useNavigation } from 'expo-router';
import { NavigationState, PartialState } from '@react-navigation/native';
import { useTheme } from '~styles';

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string | undefined {
  if (state.index === undefined) return undefined;
  const route = state.routes[state.index];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

export function useDefaultHeaderOptions() {
  const theme = useTheme();

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.text,

    headerTitleStyle: {
      fontSize: theme.fontSizes.bodyBold,
    },
  };

  return headerOptions;
}

export function useDefaultStackScreenOptions() {
  const theme = useTheme();
  const defaultHeaderOptions = useDefaultHeaderOptions();

  const screenOptions: NativeStackNavigationOptions = {
    ...defaultHeaderOptions,
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
