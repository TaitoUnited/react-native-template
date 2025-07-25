import { ScrollView, View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Note } from '~components/playground/common';
import { Grid, Spacer, Stack, Text } from '~components/uikit';

export default function Layout() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="large">
        <Note>
          If you have long lists do not use these layout components but instead
          use a virtualized list component like FlashList, FlatList, or
          SectionList!
        </Note>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Stack</Text>

          <Text variant="body">
            Stack component is used to stack elements vertically or horizontally
            while applying uniform spacing between the elements.
          </Text>

          <View style={styles.exampleBlock}>
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
          </View>

          <View style={styles.exampleBlock}>
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
          </View>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Spacer</Text>

          <Text variant="body">
            It&lsquo;s possible to intervine Spacer components within a Stack to
            apply a different spacing amount at specific places between
            elements.
          </Text>

          <View style={styles.exampleBlock}>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
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
          </View>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Grid</Text>

          <Text variant="body">
            A Grid component can be used for grid-like layouts.
          </Text>

          <View style={styles.exampleBlock}>
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
          </View>

          <Text variant="body">
            A number of columns can be provided to force the grid structure. By
            default the grid will just layout the children based on their
            instrictic size with the given spacing.
          </Text>

          <View style={styles.exampleBlock}>
            <Stack axis="y" spacing="small">
              <Text variant="bodySmallBold" color="infoContrast">
                {`<Grid spacing="xs" colums={3}>...</Grid>`}
              </Text>

              <Grid spacing="xs" columns={3}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <Box key={i} fullWidth />
                ))}
              </Grid>
            </Stack>
          </View>
        </Stack>
      </Stack>
    </ScrollView>
  );
}

const Box = (props: ViewProps & { fullWidth?: boolean }) => (
  <View style={[styles.box, props.fullWidth && { width: '100%' }]} {...props} />
);

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
  exampleBlock: {
    padding: theme.space.small,
    borderWidth: 1,
    borderColor: theme.colors.neutral3,
    borderRadius: theme.radii.small,
    backgroundColor: theme.colors.neutral5,
  },
  box: {
    height: 60,
    width: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.info,
    borderRadius: theme.radii.regular,
    backgroundColor: theme.colors.infoMuted,
  },
}));
