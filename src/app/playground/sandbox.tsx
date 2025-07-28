import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Stack, Text } from '~components/uikit';

export default function Sandbox() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="medium">
        <Text variant="body">
          You can play around with various components here if you don&lsquo;t
          want to add a new screen for them in the playground.
        </Text>
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
