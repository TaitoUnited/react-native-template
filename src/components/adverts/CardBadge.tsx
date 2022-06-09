import React from 'react';
import { IconName } from '../uikit/Icon';
import { Icon, Spacer, Stack, Text } from '~components/uikit';

interface Props {
  icon: IconName;
  label: string;
}

export const CardBadge = ({ icon, label }: Props) => {
  return (
    <Stack spacing="xsmall" axis="x" style={{ marginBottom: 8 }}>
      <Icon name={icon} size={19} />
      <Text variant="bodySmall">{label}</Text>
      <Spacer axis="x" size="medium" />
    </Stack>
  );
};
