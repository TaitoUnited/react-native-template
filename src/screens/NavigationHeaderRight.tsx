import React from 'react';
import { Stack } from '~components/uikit';
import ColorModeButton from '~components/common/ColorModeButton';
import { LanguageSelectTopBar } from '~components/settings/LanguageSelect';

const NavigationHeaderRight = () => {
  return (
    <Stack axis="x" spacing="normal">
      <ColorModeButton />
      <LanguageSelectTopBar />
    </Stack>
  );
};

export default NavigationHeaderRight;
