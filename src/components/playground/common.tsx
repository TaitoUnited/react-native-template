import type { ReactNode } from 'react';

import { styled } from '~styles';
import { Icon, Stack, Text } from '~components/uikit';

export function Note({ children }: { children: ReactNode }) {
  return (
    <NoteWrapper>
      <Stack axis="y" spacing="xsmall">
        <Stack axis="x" spacing="xxsmall" align="center">
          <Icon name="warningTriangle" color="warn" />
          <Text variant="bodyBold" color="warnText">
            Note:
          </Text>
        </Stack>

        <Text variant="bodySmall" color="warnText" withLineHeight>
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
  padding: '$normal',
});
