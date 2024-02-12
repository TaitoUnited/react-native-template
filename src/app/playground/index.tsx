import { Stack, router } from 'expo-router';

import { styled } from '~styles';
import { IconButton, Text } from '~components/uikit';
import MenuList from '~components/common/MenuList';

export default function PlaygroundPage() {
  const items: Array<{ label: string; screen: any }> = [
    { screen: 'playground/design-system', label: 'Design System' },
    { screen: 'playground/icons', label: 'Icons' },
    { screen: 'playground/buttons', label: 'Buttons' },
    { screen: 'playground/inputs', label: 'Inputs' },
    { screen: 'playground/layout', label: 'Layout' },
    { screen: 'playground/toast', label: 'Toast' },
  ];

  if (__DEV__) items.push({ screen: 'playground/sandbox', label: 'Sandbox' });

  return (
    <Wrapper>
      <Stack.Screen
        options={{
          title: 'Playground',
          headerLeft: () => (
            <IconButton icon="x" onPress={() => router.navigate('settings')} />
          ),
        }}
      />
      <MenuList
        items={items.map((item) => ({
          id: item.screen,
          label: item.label,
          target: item.screen,
          leftSlot: (
            <MenuListItemLeftSlot>
              <Text variant="bodyLargeBold" color="infoText">
                {item.label.slice(0, 2)}
              </Text>
            </MenuListItemLeftSlot>
          ),
        }))}
      />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

const MenuListItemLeftSlot = styled('View', {
  width: 40,
  height: 40,
  flexCenter: 'row',
  borderRadius: '$normal',
  backgroundColor: '$infoMuted',
});
