import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import SearchScreen from './SearchScreen';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const Stack = createStackNavigator<ParamList>();

export default function SearchNavigator() {
  useLingui();
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
