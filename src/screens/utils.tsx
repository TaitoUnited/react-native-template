import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import {
  useNavigation,
  createNavigationContainerRef,
} from '@react-navigation/native';

import type { ParamList } from './types';
import { useTheme } from '~styles';
import { Icon } from '~components/uikit';

export const navigationRef = createNavigationContainerRef<ParamList>();

// Use this helper to navigate outside of a React component
export function navigate(name: keyof ParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
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
