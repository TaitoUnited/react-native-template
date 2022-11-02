import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import SearchScreen from './SearchScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';

const Stack = createStackNavigator();

export default function SearchNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Search"
        options={{ title: t`Search` }}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}
