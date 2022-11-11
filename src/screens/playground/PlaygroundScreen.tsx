import { useEffect } from 'react';

import { usePlaygroundStore } from './helpers';
import { styled } from '~styles';
import { ParamList, ScreenProps } from '~screens/types';
import { IconButton, Icon, Stack, Text } from '~components/uikit';

export default function PlaygroundScreen({
  navigation,
}: ScreenProps<'Playground'>) {
  const setPlaygroundVisible = usePlaygroundStore(
    (s) => s.setPlaygroundVisible
  );

  const rows: Array<{ label: string; screen: keyof ParamList }> = [
    { screen: 'DesignSystem', label: 'Design System' },
    { screen: 'Icons', label: 'Icons' },
    { screen: 'Buttons', label: 'Buttons' },
    { screen: 'Inputs', label: 'Inputs' },
    { screen: 'Layout', label: 'Layout' },
    { screen: 'Toast', label: 'Toast' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="x" onPress={() => setPlaygroundVisible(false)} />
      ),
    });
  }, []); // eslint-disable-line

  return (
    <Wrapper>
      <Content>
        {rows.map((row, index) => (
          <Row
            key={row.label}
            onPress={() => navigation.navigate(row.screen as any)}
          >
            <RowContent withDivider={index < rows.length - 1}>
              <Stack axis="x" spacing="small" align="center">
                <RowDecoration>
                  <Text variant="bodyLargeBold" color="infoText">
                    {row.label.slice(0, 2)}
                  </Text>
                </RowDecoration>
                <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
                  {row.label}
                </Text>
                <Icon name="chevronRight" size={24} color="muted2" />
              </Stack>
            </RowContent>
          </Row>
        ))}
      </Content>
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

const Content = styled('View', {
  backgroundColor: '$surface',
  borderRadius: '$normal',
  overflow: 'hidden',
});

const Row = styled('TouchableHighlight', {}).attrs((p) => ({
  underlayColor: p.theme.colors.pressHighlight,
}));

const RowContent = styled('View', {
  padding: '$small',
  paddingLeft: 0,
  marginLeft: '$small',
  variants: {
    withDivider: {
      true: {
        borderBottomWidth: 1,
        borderBottomColor: '$border',
      },
    },
  },
});

const RowDecoration = styled('View', {
  width: 40,
  height: 40,
  flexCenter: 'row',
  borderRadius: '$normal',
  backgroundColor: '$infoMuted',
});
