import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ProgressBar, Stack, Text } from '~components/uikit';

const totalSteps = 5;

export default function Progress() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Progress bar</Text>

          <Stack axis="y" spacing="regular">
            {Array.from({ length: totalSteps + 1 }).map((_, i) => (
              <ProgressBar key={i} step={i} totalSteps={totalSteps} animated />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
}));
