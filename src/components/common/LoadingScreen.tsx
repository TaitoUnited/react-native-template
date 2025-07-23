import { ActivityIndicator, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { flexCenter } from '~styles/utils';

export default function LoadingScreen() {
  const { theme } = useUnistyles();

  return (
    <View style={[styles.wrapper, flexCenter()]} testID="loadingScreen">
      <ActivityIndicator size="large" color={theme.colors.text} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
}));
