import { useColorMode } from '~services/theming';
import IconButton from '~components/uikit/Buttons/IconButton';

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
