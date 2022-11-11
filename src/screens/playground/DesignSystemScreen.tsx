import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';

import { Color, styled, themeProp } from '~styles';
import { Grid, Stack, Text } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { light as colors } from '~design-system/colors';

const otherColors: Color[] = [];
const colorNames = Object.keys(colors).sort() as Color[];
const colorGroups = groupBy(colorNames, (n) => startCase(n).split(' ')[0]);

// Move colors from groups that have less than 3 colors to the `otherColors` group
Object.keys(colorGroups).forEach((group) => {
  if (colorGroups[group].length < 3) {
    colorGroups[group].forEach((color) => otherColors.push(color));
    delete colorGroups[group];
  }
});

export default function DesignSystemScreen(_: ScreenProps<'DesignSystem'>) {
  return (
    <Wrapper>
      <Stack axis="y" spacing="xlarge">
        <Stack axis="y" spacing="medium">
          <Text variant="title2">Colors</Text>

          {Object.entries(colorGroups).map(([groupName, groupColors]) => (
            <Stack key={groupName} axis="y" spacing="small">
              <Text variant="bodyBold">{groupName}</Text>

              <Grid spacing="normal" columns={3}>
                {groupColors.map((color) => (
                  <Stack key={color} axis="y" spacing="xsmall" align="center">
                    <ColorBlock bg={color} />
                    <Text variant="bodySmall">{startCase(color)}</Text>
                  </Stack>
                ))}
              </Grid>
            </Stack>
          ))}

          <Stack axis="y" spacing="small">
            <Text variant="bodyBold">Other</Text>

            <Grid spacing="normal" columns={3}>
              {otherColors.map((color) => (
                <Stack key={color} axis="y" spacing="xsmall" align="center">
                  <ColorBlock bg={color} />
                  <Text variant="bodySmall">{startCase(color)}</Text>
                </Stack>
              ))}
            </Grid>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="medium">
          <Text variant="title2">Typography</Text>
          <Text variant="body">TODO</Text>
        </Stack>

        <Stack axis="y" spacing="medium">
          <Text variant="title2">Radii</Text>
          <Text variant="body">TODO</Text>
        </Stack>

        <Stack axis="y" spacing="medium">
          <Text variant="title2">Spacing</Text>
          <Text variant="body">TODO</Text>
        </Stack>
      </Stack>
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

const ColorBlock = styled('View', {
  height: 80,
  width: '100%',
  borderRadius: '$medium',
  borderWidth: 1,
  borderColor: 'rgba(150, 150, 150, 0.15)',
  variants: {
    ...themeProp('bg', 'colors', (color) => ({
      backgroundColor: color,
    })),
  },
});
