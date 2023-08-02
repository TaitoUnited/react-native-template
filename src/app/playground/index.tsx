import { useEffect } from 'react';

import { router, useNavigation } from 'expo-router';
import { styled } from '~styles';
import { IconButton, Text } from '~components/uikit';
import MenuList from '~components/common/MenuList';

export default function PlaygroundPage() {
  const navigation = useNavigation();
  const items: Array<{ label: string; screen: any }> = [
    { screen: 'playground/design-system', label: 'Design System' },
    { screen: 'playground/icons', label: 'Icons' },
    { screen: 'playground/buttons', label: 'Buttons' },
    { screen: 'playground/inputs', label: 'Inputs' },
    { screen: 'playground/layout', label: 'Layout' },
    { screen: 'playground/toast', label: 'Toast' },
  ];

  if (__DEV__) {
    items.push({ screen: 'sandbox', label: 'Sandbox' });
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="x" onPress={() => router.push('settings')} />
      ),
    });
  }, []); // eslint-disable-line

  return (
    <Wrapper>
      <MenuList
        items={items.map((item) => ({
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