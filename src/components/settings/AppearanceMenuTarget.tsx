import { useLingui } from '@lingui/react/macro';

import MenuList from '~components/common/MenuList';
import { useColorMode } from '~services/color-mode';

export function AppearanceMenuTarget() {
  const { t } = useLingui();
  const { setColorMode, colorMode } = useColorMode();

  return (
    <MenuList
      items={[
        {
          id: 'system',
          label: t`Automatic`,
          checked: colorMode === 'auto',
          onPress: () => setColorMode('auto'),
        },
        {
          id: 'dark',
          label: t`Dark`,
          checked: colorMode === 'dark',
          onPress: () => setColorMode('dark'),
        },
        {
          id: 'light',
          label: t`Light`,
          checked: colorMode === 'light',
          onPress: () => setColorMode('light'),
        },
      ]}
    />
  );
}
