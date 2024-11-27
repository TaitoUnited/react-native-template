import type { ReactNode } from 'react';

import { Icon, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export function Note({ children }: { children: ReactNode }) {
  return (
    <NoteWrapper accessible accessibilityLabel={`Note: ${children}`}>
      <Stack axis="y" spacing="xs">
        <Stack axis="x" spacing="xxs" align="center">
          <Icon name="warning" color="warn" />
          <Text variant="bodyBold" color="warnContrast">
            Note:
          </Text>
        </Stack>

        <Text variant="bodySmall" color="warnContrast" withLineHeight>
          {children}
        </Text>
      </Stack>
    </NoteWrapper>
  );
}

const NoteWrapper = styled('View', {
  borderLeftWidth: 6,
  borderColor: '$warn',
  borderRadius: '$small',
  backgroundColor: '$warnMuted',
  padding: '$regular',
});
