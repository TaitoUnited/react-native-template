import { Text } from './Text/Text';
import { Stack } from './Stack/Stack';
import { styled } from '~styles/styled';

export function WelcomeScreen() {
  return (
    <StoryWrapper>
      <Stack axis="y" spacing="xlarge">
        <Text variant="title3">Welcome to your component development tab</Text>
        <Text variant="body">
          This tab is only available in development mode, in order to help you
          to customize and utilize the components.
        </Text>
        <Text variant="body">
          Feel free to explore the components and try them out. You can use the
          menu on the left to navigate to the different components.
        </Text>
      </Stack>
    </StoryWrapper>
  );
}

export function StoryWrapper({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});
