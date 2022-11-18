import { useEffect } from 'react';

import { styled } from '~styles';
import { ParamList, ScreenProps } from '~screens/types';
import { IconButton, Text } from '~components/uikit';
import { navigationRef } from '~screens/utils';
import MenuList from '~components/common/MenuList';

export default function PlaygroundScreen({
  navigation,
}: ScreenProps<'Playground'>) {
  const items: Array<{ label: string; screen: keyof ParamList }> = [
    { screen: 'DesignSystem', label: 'Design System' },
    { screen: 'Icons', label: 'Icons' },
    { screen: 'Buttons', label: 'Buttons' },
    { screen: 'Inputs', label: 'Inputs' },
    { screen: 'Layout', label: 'Layout' },
    { screen: 'Toast', label: 'Toast' },
    { screen: 'Sandbox', label: 'Sandbox' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="x" onPress={() => navigationRef.goBack()} />
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
