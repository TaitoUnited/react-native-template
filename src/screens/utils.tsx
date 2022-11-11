import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import { useTheme } from '~styles';
import { Icon } from '~components/uikit';

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
