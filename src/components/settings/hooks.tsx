import { msg } from '@lingui/macro';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';

import { AppearanceMenuTarget } from './AppearanceMenuTarget';
import { LanguageMenuTarget } from './LanguageMenuTarget';
import { SystemInfoMenuTarget } from './SystemInfoMenuTarget';

export function useMenuListItem({ targetName }: { targetName: string }) {
  const { locale, _ } = useI18n();
  const { colorMode } = useColorMode();

  let label = '';
  let currentValue;
  let target: FunctionComponent<any> = () => <View />;

  switch (targetName) {
    case 'LanguageMenuTarget':
      label = _(msg`Language`);
      currentValue = locale === 'en' ? _(msg`English`) : _(msg`Suomi`);
      target = LanguageMenuTarget;
      break;
    case 'AppearanceMenuTarget':
      label = _(msg`Appearance`);
      currentValue =
        colorMode === 'light'
          ? _(msg`Light`)
          : colorMode === 'dark'
            ? _(msg`Dark`)
            : _(msg`Automatic`);
      target = AppearanceMenuTarget;
      break;
    case 'SystemInfoMenuTarget':
      label = _(msg`Info`);
      target = SystemInfoMenuTarget;
      break;
    default:
      break;
  }

  return {
    id: targetName,
    label,
    currentValue,
    target,
    targetName,
  };
}
