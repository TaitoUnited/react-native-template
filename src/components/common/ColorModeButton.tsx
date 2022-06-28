import { IconButton } from '~components/uikit';
import { useColorMode } from '~services/theming';

export default function ColorModeButton() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      onPress={toggleColorMode}
      size="small"
      icon={colorMode === 'light' ? 'lightningFilled' : 'lightningOutline'}
    />
  );
}
