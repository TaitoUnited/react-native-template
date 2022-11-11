import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';

import { Color, styled, themeProp } from '~styles';
import { Grid, Stack, Text } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { light as colors } from '~design-system/colors';
import { native as typography } from '~design-system/typography';
import * as radii from '~design-system/radii';
import * as spacing from '~design-system/spacing';

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

const typographyNames = Object.keys(typography).sort();
const radiiEntries = Object.entries(radii).sort((a, b) => a[1] - b[1]);
const spacingEntries = Object.entries(spacing).sort((a, b) => a[1] - b[1]);

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

          <Stack axis="y" spacing="xsmall">
            {typographyNames.map((name) => (
              <TypographyBlock key={name}>
                <Text variant={name as any}>{startCase(name)}</Text>
              </TypographyBlock>
            ))}
          </Stack>
        </Stack>

        <Stack axis="y" spacing="normal">
          <Text variant="title2">Radii</Text>

          <Grid spacing="normal" justify="center">
            {radiiEntries.map(([name, value]) => (
              <Stack key={name} axis="y" spacing="xsmall" align="center">
                <RadiiBlock style={{ borderRadius: value }}>
                  <Text variant="body" color="textMuted">
                    {value}px
                  </Text>
                </RadiiBlock>
                <Text variant="bodySmall">{startCase(name)}</Text>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Stack axis="y" spacing="medium">
          <Text variant="title2">Spacing</Text>

          <Stack axis="y" spacing="xxsmall">
            {spacingEntries.map(([name, value]) => (
              <Stack key={name} axis="x" spacing="xsmall" align="center">
                <Text variant="bodySmall" style={{ minWidth: 56 }}>
                  {startCase(name)}
                </Text>
                <SpacingBlock key={name} style={{ width: value }} />
                <Text variant="bodySmall" color="textMuted">
                  {value}px
                </Text>
              </Stack>
            ))}
          </Stack>
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
    paddingBottom: 200,
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

const TypographyBlock = styled('View', {
  padding: '$normal',
  borderRadius: '$medium',
  borderWidth: 1,
  borderColor: 'rgba(150, 150, 150, 0.15)',
});

const RadiiBlock = styled('View', {
  height: 100,
  width: 100,
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$muted5',
  flexCenter: 'row',
});

const SpacingBlock = styled('View', {
  height: 24,
  borderWidth: 1,
  borderRadius: 2,
  borderColor: '$border',
  backgroundColor: '$muted5',
});
