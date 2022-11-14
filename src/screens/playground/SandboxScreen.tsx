import type { ScreenProps } from '~screens/types';
import { styled } from '~styles';
import { Text, Stack } from '~components/uikit';

export default function SandboxScreen(_: ScreenProps<'Sandbox'>) {
  return (
    <Wrapper>
      <Stack axis="y" spacing="medium">
        <Text variant="body" withLineHeight>
          You can play around with various components here if you don&lsquo;t
          want to add a new screen for them in the playground.
        </Text>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
    paddingBottom: 100,
  },
}));
