import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import {
  useNavigation,
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

import type { ParamList } from './types';
import { useTheme } from '~styles';
import { Icon } from '~components/uikit';
import storage from '~utils/storage';

export const navigationRef = createNavigationContainerRef<ParamList>();

// Use this helper to navigate outside of a React component
export function navigate(name: keyof ParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string | undefined {
  if (state.index === undefined) return undefined;
  const route = state.routes[state.index];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

export function useNavigationStateRestoration() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    async function restoreState() {
      try {
        const state = await storage.get('@app/navigation-state');
        if (state !== undefined) setInitialState(state);
      } finally {
        setIsReady(true);
      }
    }

    if (!isReady) restoreState();
  }, [isReady]);

  return { isReady, initialState };
}

export function useDefaultStackScreenOptions() {
  const theme = useTheme();

  const screenOptions: StackNavigationOptions = {
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
    headerBackTitleStyle: {
      fontSize: theme.fontSizes.body,
    },
    headerBackTitle: t`Back`,
    headerBackImage: () => <Icon name="chevronLeft" size={28} />,
    cardStyle: {
      backgroundColor: theme.colors.background,
    },
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
