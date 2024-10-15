import { Stack, router } from 'expo-router';

import MenuList from '~components/common/MenuList';
import { IconButton, Text } from '~components/uikit';
import { styled } from '~styles';

export default function PlaygroundPage() {
  const items: Array<{ label: string; screen: any }> = [
    { screen: 'playground/design-system', label: 'Design System' },
    { screen: 'playground/icons', label: 'Icons' },
    { screen: 'playground/buttons', label: 'Buttons' },
    { screen: 'playground/inputs', label: 'Inputs' },
    { screen: 'playground/bottom-sheet', label: 'Bottom Sheet' },
    { screen: 'playground/layout', label: 'Layout' },
    { screen: 'playground/accordion', label: 'Accordion' },
    { screen: 'playground/progress', label: 'Progress' },
    { screen: 'playground/image', label: 'Image' },
    { screen: 'playground/toast', label: 'Toast' },
  ];

  if (__DEV__) items.push({ screen: 'playground/sandbox', label: 'Sandbox' });

  return (
    <Wrapper>
      <Stack.Screen
        options={{
          title: 'Playground',
          headerLeft: () => (
            <IconButton
              icon="close"
              onPress={() => router.navigate('settings')}
              color="neutral"
            />
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
