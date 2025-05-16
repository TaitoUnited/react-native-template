import { Trans, useLingui } from '@lingui/react/macro';
import { Stack as ExpoStack, Link } from 'expo-router';

import { Button, Stack, Text } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { styled } from '~styles';

export default function NotFoundScreen() {
  const { t } = useLingui();
  const isLoggedIn = useAuthStore((s) => s.status) === 'authenticated';

  return (
    <>
      <ExpoStack.Screen options={{ title: t`Oops!` }} />
      <Wrapper testID="homeScreen">
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
      </Wrapper>
    </>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs(() => ({
  contentContainerStyle: {
    margin: 'auto',
  },
}));
