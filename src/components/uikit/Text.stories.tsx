import { Stack } from './Stack';
import { capitalize } from './utils';
import { Text } from './Text';
import { native as typography } from '~styles/tokens/typography';

export function TextWrapper() {
  return (
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
  );
}
