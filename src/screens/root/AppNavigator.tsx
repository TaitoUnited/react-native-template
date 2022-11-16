import { Trans } from '@lingui/macro';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { styled, useTheme } from '~styles';
import { Stack, Text } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { ParamList } from '~screens/types';
import TabNavigator from '~screens/root/TabNavigator';
import PlaygroundNavigator from '~screens/playground';
import MenuListNavigator from '~screens/menu-list';

const AppStack = createStackNavigator<ParamList>();

export default function AppNavigator() {
  const theme = useTheme();
  const status = useAuthStore((s) => s.status);

  return (
    <>
      <AppStack.Navigator>
        <AppStack.Group>
          <AppStack.Screen
            name="Tabs"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
          <AppStack.Screen
            name="PlaygroundStack"
            options={{ headerShown: false }}
            component={PlaygroundNavigator}
          />
          <AppStack.Screen
            name="MenuListStack"
            options={{ headerShown: false }}
            component={MenuListNavigator}
          />
        </AppStack.Group>

        {/* Add global modal screens here that can be opened from anywhere in the app */}
        {/* <AppStack.Group screenOptions={{ presentation: 'modal' }}>
          <AppStack.Screen
            name="PermissionModal"
            component={PermissionModalScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </AppStack.Group> */}
      </AppStack.Navigator>

      {status === 'logging-out' && (
        <LoggingOutOverlay entering={FadeIn.duration(100)}>
          <Stack axis="x" spacing="small" align="center">
            <ActivityIndicator color={theme.colors.text} size="large" />
            <Text variant="body">
              <Trans>Logging out...</Trans>
            </Text>
          </Stack>
        </LoggingOutOverlay>
      )}
    </>
  );
}

const LoggingOutOverlay = styled(Animated.View, {
  absoluteFill: true,
  flexCenter: 'row',
  backgroundColor: '$background',
});
