import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import AdvertsScreen from './AdvertsScreen';
import AdvertsFilters from '../../components/adverts/AdvertsFilters';
import config from '../../constants/config';
import AdvertsScreenPlaceholder from './AdvertsScreenPlaceholder';
import { useDefaultStackScreenOptions } from '~screens/utils';

const AdvertsStack = createStackNavigator();

export default function AdvertsNavigator() {
  const screenOptions = useDefaultStackScreenOptions();

  return (
    <AdvertsStack.Navigator screenOptions={screenOptions}>
      <AdvertsStack.Screen
        name="Adverts"
        component={
          config.PLACEHOLDER_MODE ? AdvertsScreenPlaceholder : AdvertsScreen
        }
        options={{
          title: t`Adverts`,
          header: config.PLACEHOLDER_MODE
            ? undefined
            : () => <AdvertsFilters />,
        }}
      />
      {/* TODO: add other screens */}
    </AdvertsStack.Navigator>
  );
}
