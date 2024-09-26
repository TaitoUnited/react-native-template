import { msg } from '@lingui/macro';

import MenuList from '~components/common/MenuList';
import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';

export function AppearanceMenuTarget() {
  const { _ } = useI18n();
  const { setColorMode, colorMode } = useColorMode();

  return (
    <MenuList
      items={[
        {
          id: 'system',
          label: _(msg`Automatic`),
          checked: colorMode === 'system',
          onPress: () => setColorMode('system'),
        },
        {
          id: 'dark',
          label: _(msg`Dark`),
          checked: colorMode === 'dark',
          onPress: () => setColorMode('dark'),
        },
        {
          id: 'light',
          label: _(msg`Light`),
          checked: colorMode === 'light',
          onPress: () => setColorMode('light'),
        },
      ]}
    />
  );
}
