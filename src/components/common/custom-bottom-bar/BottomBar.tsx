import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { type TabList } from '~app/(tabs)/_layout';
import { styled } from '~styles';
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
  return (
    <TabBarContainer>
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
    </TabBarContainer>
  );
}

const TabBarContainer = styled('View', {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '$surface',
  paddingVertical: '$xs',
  shadow: 'small',
});
