import { IconButton, Stack } from '..';
import { StoryWrapper } from '../StoriesUtils';
import type { ButtonProps } from '~components/uikit/Buttons/types';

const sizes: NonNullable<ButtonProps['size']>[] = ['small', 'medium', 'large'];

function AllVariants() {
  return (
    <Stack axis="y" spacing="large" align="center">
      <Stack axis="y" spacing="large" align="center">
        {sizes.map((size) => (
          <IconButton
            key={size}
            size={size}
            icon="calendar"
            onPress={() => console.log('Filled')}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export function IconButtonWrapper() {
  return (
    <StoryWrapper>
      <AllVariants />
    </StoryWrapper>
  );
}
