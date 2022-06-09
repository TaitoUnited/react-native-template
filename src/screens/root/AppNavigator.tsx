import { createStackNavigator } from '@react-navigation/stack';

import { t } from '@lingui/macro';
import TabNavigator from './TabNavigator';
import ProfileUpdateScreen from '~screens/profile/ProfileUpdateScreen';
import StatusBar from '~components/common/StatusBar';
import { useDefaultStackScreenOptions } from '~screens/utils';
import AdvertDetailsScreen from '~screens/adverts/AdvertDetailsScreen';

const AppStack = createStackNavigator();

export default function AppNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <>
      <AppStack.Navigator>
        <AppStack.Group>
          <AppStack.Screen
            name="Tabs"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </AppStack.Group>

        <AppStack.Group screenOptions={screenOptions}>
          <AppStack.Screen
            name="ProfileUpdate"
            component={ProfileUpdateScreen}
            options={{
              gestureEnabled: false, // disable swipe-to-close
            }}
          />
        </AppStack.Group>

        <AppStack.Group screenOptions={screenOptions}>
          <AppStack.Screen
            name="AdvertDetails"
            component={AdvertDetailsScreen}
            options={{
              title: t`Announcement`,
              headerBackTitleVisible: false,
            }}
          />
        </AppStack.Group>
      </AppStack.Navigator>

      <StatusBar />
    </>
  );
}
