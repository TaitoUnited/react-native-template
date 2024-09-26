import { msg } from '@lingui/macro';

import MenuList from '~components/common/MenuList';
import { useI18n } from '~services/i18n';

export function LanguageMenuTarget() {
  const { setLocale, locale, _ } = useI18n();

  return (
    <MenuList
      items={[
        {
          id: 'en',
          label: _(msg`English`),
          checked: locale === 'en',
          onPress: () => setLocale('en'),
        },
        {
          id: 'fi',
          label: _(msg`Finnish`),
          checked: locale === 'fi',
          onPress: () => setLocale('fi'),
        },
      ]}
    />
  );
}
