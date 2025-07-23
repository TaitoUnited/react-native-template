import { setStringAsync } from 'expo-clipboard';
import { Pressable, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { showToast } from '~components/common/Toaster';
import { Note } from '~components/playground/common';
import { Grid, Icon, Stack, Text } from '~components/uikit';
import type { IconName } from '~components/uikit/Icon';
import * as icons from '~design-system/icons';
import { haptics } from '~utils/haptics';

export default function Icons() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="medium">
        <Note>
          You can long press on an icon to copy its name to the clipboard.
        </Note>
        <Grid spacing="small" justify="between" align="center">
          {Object.keys(icons).map((name) => (
            <Pressable
              key={name}
              onLongPress={async () => {
                haptics.notificationSuccess();
                await setStringAsync(name);
                showToast({
                  title: `Copied to clipboard`,
                  subtitle: `"${name}"`,
                  type: 'success',
                  icon: 'check',
                });
              }}
            >
              <Stack
                style={styles.iconWrapper}
                axis="y"
                spacing="small"
                align="center"
                justify="center"
              >
                <Icon
                  name={name as IconName}
                  size={24}
                  accessibilityLabel={'Icon'}
                />
                <Text
                  variant="bodyExtraSmall"
                  color="textMuted"
                  numberOfLines={1}
                  align="center"
                >
                  {name}
                </Text>
              </Stack>
            </Pressable>
          ))}
        </Grid>
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
  iconWrapper: {
    padding: theme.space.xs,
    borderRadius: theme.radii.small,
    backgroundColor: theme.colors.surface,
    width: 80,
    height: 80,
  },
}));
