import { StyleSheet } from 'react-native';

import { Note } from './common';
import { styled } from '~styles';
import { Grid, Spacer, Stack, Text } from '~components/uikit';
import { ScreenProps } from '~screens/types';

export default function LayoutScreen(_: ScreenProps<'Layout'>) {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Note>
          If you have long lists do not use these layout components but instead
          use a virtualized list component like FlashList, FlatList, or
          SectionList!
        </Note>

        <Stack axis="y" spacing="normal">
          <Text variant="title2">Stack</Text>

          <Text variant="body" withLineHeight>
            Stack component is used to stack elements vertically or horizontally
            while applying uniform spacing between the elements.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoText">
                {`<Stack axis="x" spacing="normal">...</Stack>`}
              </Text>

              <Stack axis="x" spacing="normal">
                <Box />
                <Box />
                <Box />
              </Stack>
            </Stack>
          </ExampleBlock>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoText">
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

        <Stack axis="y" spacing="normal">
          <Text variant="title2">Spacer</Text>

          <Text variant="body" withLineHeight>
            It&lsquo;s possible to intervine Spacer components within a Stack to
            apply a different spacing amount at specific places between
            elements.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoText" withLineHeight>
                {`
<Stack axis="x" spacing="xsmall">
    <Box />
    <Spacer size="large" />
    <Box />
    <Box />
</Stack>`.trim()}
              </Text>

              <Stack axis="x" spacing="xsmall">
                <Box />
                <Spacer size="large" />
                <Box />
                <Box />
              </Stack>
            </Stack>
          </ExampleBlock>
        </Stack>

        <Stack axis="y" spacing="normal">
          <Text variant="title2">Grid</Text>

          <Text variant="body" withLineHeight>
            A Grid component can be used for grid-like layouts.
          </Text>

          <ExampleBlock>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoText">
                {`<Grid spacing="xsmall">...</Grid>`}
              </Text>

              <Grid spacing="xsmall">
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
              <Text variant="bodySmallBold" color="infoText">
                {`<Grid spacing="xsmall" colums={3}>...</Grid>`}
              </Text>

              <Grid spacing="xsmall" columns={3}>
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
    padding: p.theme.space.normal,
    paddingBottom: 100,
  },
}));

const ExampleBlock = styled('View', {
  padding: '$small',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$small',
  backgroundColor: '$muted5',
});

const Box = styled('View', {
  height: 60,
  width: 60,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '$info',
  borderRadius: '$normal',
  backgroundColor: '$infoMuted',
});
