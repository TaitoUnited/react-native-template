import { ActivityIndicator, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export default function LoadingScreen() {
  const { theme } = useUnistyles();

  return (
    <View style={[styles.wrapper]} testID="loadingScreen">
      <ActivityIndicator size="large" color={theme.colors.text} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    ...theme.utils.flexCenter,
  },
}));
