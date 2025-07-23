import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon, Stack, Text } from '~components/uikit';

export function Note({ children }: { children: ReactNode }) {
  return (
    <View
      style={styles.wrapper}
      accessible
      accessibilityLabel={`Note: ${children}`}
    >
      <Stack axis="y" spacing="xs">
        <Stack axis="x" spacing="xxs" align="center">
          <Icon name="warning" color="warn" />
          <Text variant="bodyBold" color="warnContrast">
            Note:
          </Text>
        </Stack>

        <Text variant="bodySmall" color="warnContrast" withLineHeight>
          {children}
        </Text>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    borderLeftWidth: 6,
    borderColor: theme.colors.warn,
    borderRadius: theme.radii.small,
    backgroundColor: theme.colors.warnMuted,
    padding: theme.space.regular,
  },
}));
