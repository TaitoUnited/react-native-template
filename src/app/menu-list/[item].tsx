import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useMenuListItem } from '~components/settings/hooks';

export default function MenuListItem() {
  const { item } = useLocalSearchParams<{ item: string }>();
  const { target, label } = useMenuListItem({ targetName: item });

  const Target = target;

  // NOTE: in case navigation state persistence is added the `target` component
  // will not be present in the navigation params since it's not serializable.
  useEffect(() => {
    if (!Target && router.canGoBack()) router.back();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Target) return null;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen options={{ title: label }} />
      <Target />
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
