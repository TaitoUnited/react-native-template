import { Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function Sandbox() {
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
    padding: p.theme.space.regular,
  },
}));
