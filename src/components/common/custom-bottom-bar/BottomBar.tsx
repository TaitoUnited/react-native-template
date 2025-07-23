import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { type TabList } from '~app/(tabs)/_layout';
import { haptics } from '~utils/haptics';

import { TabBarButton } from './Tab';

type CustomTabBarProps = Pick<
  BottomTabBarProps,
  'state' | 'descriptors' | 'navigation'
> & {
  tabs: TabList;
};

const EXCLUDED_ROUTES = ['_sitemap', '+not-found'];

export function BottomBar({
  state,
  descriptors,
  navigation,
  tabs,
}: CustomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {state.routes.map((route, index) => {
        if (EXCLUDED_ROUTES.includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title || route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            haptics.selection();
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () =>
          navigation.emit({ type: 'tabLongPress', target: route.key });

        return (
          <TabBarButton
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            tab={tabs[index]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.space.xs,
    ...theme.shadows.small,
  },
}));
