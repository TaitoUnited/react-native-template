import { Trans } from '@lingui/macro';
import { FillButton } from '~components/uikit';
import ButtonContent from '~components/uikit/Buttons/ButtonContent';
import { useColorMode } from '~services/color-mode';

export default function ColorModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <FillButton onPress={toggleColorMode} size="small">
      <ButtonContent
        variant="primary"
        textColor="text"
        icon={colorMode === 'light' ? 'lightningFilled' : 'lightningOutlined'}
      >
        <Trans>
          Change theme to {colorMode === 'light' ? 'dark' : 'light'}
        </Trans>
      </ButtonContent>
    </FillButton>
  );
}
