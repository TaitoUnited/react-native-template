import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const Card = (props: ViewProps) => (
  <View style={styles.card} {...props} />
);

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.regular,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.line3,
    padding: theme.space.regular,
    ...theme.shadows.small,
  },
}));
