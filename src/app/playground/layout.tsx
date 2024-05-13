import { StyleSheet } from 'react-native';

import { Note } from '~components/playground/common';
import { Grid, Spacer, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function Layout() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Note>
          If you have long lists do not use these layout components but instead
          use a virtualized list component like FlashList, FlatList, or
          SectionList!
        </Note>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Stack</Text>

          <Text variant="body" withLineHeight>
            Stack component is used to stack elements vertically or horizontally
            while applying uniform spacing between the elements.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
                {`<Stack axis="x" spacing="regular">...</Stack>`}
              </Text>

              <Stack axis="x" spacing="regular">
                <Box />
                <Box />
                <Box />
              </Stack>
            </Stack>
          </ExampleBlock>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
                {`<Stack axis="y" spacing="small">...</Stack>`}
              </Text>

              <Stack axis="y" spacing="small">
                <Box />
                <Box />
                <Box />
              </Stack>
            </Stack>
          </ExampleBlock>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Spacer</Text>

          <Text variant="body" withLineHeight>
            It&lsquo;s possible to intervine Spacer components within a Stack to
            apply a different spacing amount at specific places between
            elements.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast" withLineHeight>
                {`
<Stack axis="x" spacing="xs">
    <Box />
    <Spacer size="large" />
    <Box />
    <Box />
</Stack>`.trim()}
              </Text>

              <Stack axis="x" spacing="xs">
                <Box />
                <Spacer size="large" />
                <Box />
                <Box />
              </Stack>
            </Stack>
          </ExampleBlock>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Grid</Text>

          <Text variant="body" withLineHeight>
            A Grid component can be used for grid-like layouts.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
                {`<Grid spacing="xs">...</Grid>`}
              </Text>

              <Grid spacing="xs">
                {Array.from({ length: 15 }).map((_, i) => (
                  <Box key={i} />
                ))}
              </Grid>
            </Stack>
          </ExampleBlock>

          <Text variant="body" withLineHeight>
            A number of columns can be provided to force the grid structure. By
            default the grid will just layout the children based on their
            instrictic size with the given spacing.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
                {`<Grid spacing="xs" colums={3}>...</Grid>`}
              </Text>

              <Grid spacing="xs" columns={3}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <Box key={i} style={{ width: '100%' }} />
                ))}
              </Grid>
            </Stack>
          </ExampleBlock>
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
    paddingBottom: 100,
  },
}));

const ExampleBlock = styled('View', {
  padding: '$small',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$small',
  backgroundColor: '$neutral5',
});

const Box = styled('View', {
  height: 60,
  width: 60,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '$info',
  borderRadius: '$regular',
  backgroundColor: '$infoMuted',
});
