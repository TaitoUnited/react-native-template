import { Stack, router } from 'expo-router';

import MenuList, { Item } from '~components/common/MenuList';
import { IconButton, Text } from '~components/uikit';
import { styled } from '~styles';

export default function PlaygroundPage() {
  const items: Item[] = [
    { id: 'design-system', target: '/playground/design-system', label: 'Design System' }, // prettier-ignore
    { id: 'icons', target: '/playground/icons', label: 'Icons' },
    { id: 'buttons', target: '/playground/buttons', label: 'Buttons' },
    { id: 'inputs', target: '/playground/inputs', label: 'Inputs' },
    { id: 'bottom', target: '/playground/bottom-sheet', label: 'Bottom Sheet' },
    { id: 'layout', target: '/playground/layout', label: 'Layout' },
    { id: 'accordion', target: '/playground/accordion', label: 'Accordion' },
    { id: 'progress', target: '/playground/progress', label: 'Progress' },
    { id: 'image', target: '/playground/image', label: 'Image' },
    { id: 'toast', target: '/playground/toast', label: 'Toast' },
  ];

  if (__DEV__) items.push({ id: 'sandbox', target: '/playground/sandbox', label: 'Sandbox' }); // prettier-ignore

  return (
    <Wrapper>
      <Stack.Screen
        options={{
          title: 'Playground',
          headerLeft: () => (
            <IconButton
              icon="close"
              onPress={() => router.navigate('/settings')}
              color="neutral"
            />
          ),
        }}
      />
      <MenuList
        items={items.map((item) => ({
          id: item.id,
          label: item.label,
          target: item.target,
          leftSlot: (
            <MenuListItemLeftSlot>
              <Text variant="bodyLargeBold" color="infoContrast">
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
    padding: p.theme.space.regular,
  },
}));

const MenuListItemLeftSlot = styled('View', {
  width: 40,
  height: 40,
  flexCenter: 'row',
  borderRadius: '$regular',
  backgroundColor: '$infoMuted',
});
