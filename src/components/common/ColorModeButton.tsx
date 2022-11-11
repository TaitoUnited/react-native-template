import { Trans } from '@lingui/macro';
import { FillButton } from '~components/uikit';
import { useColorMode } from '~services/color-mode';

export default function ColorModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <FillButton variant="neutral" onPress={toggleColorMode}>
      <Trans>Change theme to {colorMode === 'light' ? 'dark' : 'light'}</Trans>
    </FillButton>
  );
}
