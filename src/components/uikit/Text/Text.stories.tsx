import { Stack } from '../Stack/Stack';
import { capitalize } from '../utils';
import { Text } from './Text';
import { StoryWrapper } from '../StoriesUtils';
import { native as typography } from '~styles/tokens/typography';

export function TextWrapper() {
  return (
    <StoryWrapper>
      <Stack axis="y" spacing="medium">
        {Object.keys(typography).map((variant) => (
          <Text
            variant={variant as typeof Text.arguments.variant}
            color="text"
            key={variant}
          >
            {capitalize(variant).replace(/-/g, ' ')}
          </Text>
        ))}
      </Stack>
    </StoryWrapper>
  );
}
