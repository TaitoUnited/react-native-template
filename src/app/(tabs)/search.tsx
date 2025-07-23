import { Trans } from '@lingui/react/macro';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '~components/uikit';

export default function Search() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      testID="searchScreen"
    >
      <Text variant="body">
        <Trans>Search</Trans>
      </Text>
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
