import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import LandingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const LoginStack = createStackNavigator<ParamList>();

export default function UnauthedNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <LoginStack.Navigator screenOptions={screenOptions}>
      <LoginStack.Screen
        name="Landing"
        options={{ headerShown: false }}
        component={LandingScreen}
      />
      <LoginStack.Screen
        name="Login"
        options={{ title: t`Login` }}
        component={LoginScreen}
      />
      <LoginStack.Screen
        name="Signup"
        options={{ title: t`Signup` }}
        component={SignupScreen}
      />
    </LoginStack.Navigator>
  );
}
