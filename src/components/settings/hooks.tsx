import { useLingui } from '@lingui/react/macro';
import { type FunctionComponent } from 'react';
import { View } from 'react-native';

import { useI18n } from '~services/i18n';

import { LanguageMenuTarget } from './LanguageMenuTarget';
import { SystemInfoMenuTarget } from './SystemInfoMenuTarget';

export function useMenuListItem({ targetName }: { targetName: string }) {
  const { locale } = useI18n();
  const { t } = useLingui();

  let label = '';
  let currentValue;
  let target: FunctionComponent<any> = () => <View />; // eslint-disable-line typescript-eslint/no-explicit-any

  switch (targetName) {
    case 'LanguageMenuTarget':
      label = t`Language`;
      currentValue = locale === 'en' ? t`English` : t`Suomi`;
      target = LanguageMenuTarget;
      break;
    // case 'AppearanceMenuTarget':
    //   label = t`Appearance`;
    //   currentValue =
    //     colorMode === 'light'
    //       ? t`Light`
    //       : colorMode === 'dark'
    //         ? t`Dark`
    //         : t`Automatic`;
    //   target = AppearanceMenuTarget;
    //   break;
    case 'SystemInfoMenuTarget':
      label = t`Info`;
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
