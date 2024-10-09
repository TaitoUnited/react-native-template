import startCase from 'lodash/startCase';

import { Note } from '~components/playground/common';
import { Grid, Stack, Text } from '~components/uikit';
import * as colors from '~design-system/colors';
import * as radii from '~design-system/radii';
import spacing from '~design-system/spacing.json';
import * as typography from '~design-system/typography';
import { styled, themeProp } from '~styles';

const typographyNames = Object.keys(typography).sort();
const radiiEntries = Object.entries(radii).sort((a, b) => a[1] - b[1]);
const spacingEntries = Object.entries(spacing).sort((a, b) => a[1] - b[1]);

export default function DesignSystem() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="xl">
        <Stack axis="y" spacing="medium">
          <Text
            variant="headingS"
            accessibilityRole="header"
            accessibilityLabel="Colors"
          >
            Colors
          </Text>

          {Object.entries(colors).map((category) => (
            <Stack key={category[0]} axis="y" spacing="small">
              <Text
                variant="bodyBold"
                accessibilityLabel={startCase(category[0])}
                accessibilityRole="header"
              >
                {startCase(category[0])}
              </Text>

              <Grid spacing="regular" columns={3}>
                {Object.entries(category[1]).map((color) => {
                  const colorName = color[0] as colors.ColorsToken;
                  return (
                    <Stack
                      key={colorName}
                      axis="y"
                      spacing="xs"
                      align="center"
                      accessible
                      accessibilityLabel={`Color token: ${colorName}, color value: ${color[1]}`}
                    >
                      <ColorBlock bg={colorName} />
                      <Text variant="bodySmall" color="neutral2">
                        {startCase(colorName)}
                      </Text>
                    </Stack>
                  );
                })}
              </Grid>
            </Stack>
          ))}

          <Note>
            If the design system colors are shared between a Web app and a
            native app there might be some colors that are not relevant to
            native apps like focus related colors.
          </Note>
        </Stack>

        <Stack axis="y" spacing="medium">
          <Text variant="headingS" accessibilityRole="header">
            Typography
          </Text>

          <Stack axis="y" spacing="xs">
            {/* Accessibility note: Unless we have a description attached to the typography variant coming from Figma, we cannot make this very accessible */}
            {typographyNames.map((name) => (
              <TypographyBlock key={name}>
                <Text variant={name as any}>{startCase(name)}</Text>
              </TypographyBlock>
            ))}
          </Stack>

          <Note>
            Use the Text component to render text with the correct typography
            variant!
          </Note>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS" accessibilityRole="header">
            Radii
          </Text>

          <Grid spacing="regular" justify="center">
            {radiiEntries.map(([name, value]) => (
              <Stack
                key={name}
                axis="y"
                spacing="xs"
                align="center"
                accessible
                accessibilityLabel={`Radii token: ${name}, radii value: ${value} pixels`}
              >
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
          <Text variant="headingS" accessibilityRole="header">
            Spacing
          </Text>

          <Stack axis="y" spacing="xxs">
            {spacingEntries.map(([name, value]) => (
              <Stack
                key={name}
                axis="x"
                spacing="xs"
                align="center"
                accessible
                accessibilityLabel={`Spacing token: ${name}, spacing value: ${value} pixels`}
              >
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

          <Note>
            Use spacing tokens for margins and paddings. Use the layout
            components like Stack, Spacer, or Grid to render elements with
            proper spacing. Try to avoid adding margins to elements directly.
          </Note>
        </Stack>
      </Stack>
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
  padding: '$regular',
  borderRadius: '$medium',
  borderWidth: 1,
  borderColor: 'rgba(150, 150, 150, 0.15)',
});

const RadiiBlock = styled('View', {
  height: 100,
  width: 100,
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$neutral5',
  flexCenter: 'row',
});

const SpacingBlock = styled('View', {
  height: 24,
  borderWidth: 1,
  borderRadius: 2,
  borderColor: '$border',
  backgroundColor: '$neutral5',
});
