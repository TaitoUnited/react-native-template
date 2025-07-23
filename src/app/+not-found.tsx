import { Trans, useLingui } from '@lingui/react/macro';
import { Stack as ExpoStack, Link } from 'expo-router';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Stack, Text } from '~components/uikit';
import { useAuthStore } from '~services/auth';

export default function NotFoundScreen() {
  const { t } = useLingui();
  const isLoggedIn = useAuthStore((s) => s.status) === 'authenticated';

  return (
    <>
      <ExpoStack.Screen options={{ title: t`Oops!` }} />
      <ScrollView
        contentContainerStyle={styles.container}
        testID="not-found-screen"
      >
        <Stack axis="y" spacing="regular" align="center" justify="center">
          <Text variant="body">
            <Trans>This screen does not exist</Trans>
          </Text>
          <Link href={isLoggedIn ? '/(tabs)/home' : '/(auth)'} asChild>
            <Button>
              <Trans>Go to home screen!</Trans>
            </Button>
          </Link>
        </Stack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 'auto',
  },
});
