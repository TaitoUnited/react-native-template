import { useLingui } from '@lingui/react/macro';

import MenuList from '~components/common/MenuList';
import { useI18n } from '~services/i18n';

export function LanguageMenuTarget() {
  const { changeLocale, locale } = useI18n();
  const { t } = useLingui();

  return (
    <MenuList
      items={[
        {
          id: 'en',
          label: t`English`,
          checked: locale === 'en',
          onPress: () => changeLocale('en'),
        },
        {
          id: 'fi',
          label: t`Finnish`,
          checked: locale === 'fi',
          onPress: () => changeLocale('fi'),
        },
      ]}
    />
  );
}
