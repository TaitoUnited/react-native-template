import { Trans } from '@lingui/macro';
import { Stack as ExpoStack, Link } from 'expo-router';
import { Button, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function NotFoundScreen() {
  return (
    <>
      <ExpoStack.Screen options={{ title: 'Oops!' }} />
      <Wrapper axis="y" spacing="large" align="center" justify="center">
        <Text variant="bodyLargeBold" align="center">
          <Trans>This screen doesn't exist.</Trans>
        </Text>

        <Link href="/(tabs)/home" asChild>
          <Button>
            <Trans>Go back to home</Trans>
          </Button>
        </Link>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Stack, {
  flex: 1,
  padding: '$2xl',
});
