import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import StatusBar from '~components/common/StatusBar';

const AppStack = createStackNavigator();

export default function AppNavigator() {
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
      </AppStack.Navigator>

      <StatusBar />
    </>
  );
}
