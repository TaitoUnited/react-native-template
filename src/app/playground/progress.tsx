import { ProgressBar, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

const totalSteps = 5;

export default function Progress() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Progress bar</Text>

          <Stack axis="y" spacing="regular">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <ProgressBar key={i} step={i + 1} totalSteps={totalSteps} />
            ))}
          </Stack>
        </Stack>
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
