import { useLingui } from '@lingui/react/macro';
import {
  type NavigationState,
  type PartialState,
} from '@react-navigation/native';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useUnistyles } from 'react-native-unistyles';

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string | undefined {
  if (state.index === undefined) return undefined;
  const route = state.routes[state.index];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

export function useDefaultStackScreenOptions() {
  const { t } = useLingui();
  const { theme } = useUnistyles();

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
  options: NativeStackNavigationOptions,
  deps: unknown[] = []
) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(options);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
