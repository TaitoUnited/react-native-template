import { t } from '@lingui/macro';
import React from 'react';
import { Alert } from 'react-native';

import { Locale, useI18n } from '../../services/i18n';
import { Select } from '../uikit';

export const languageOptions: { label: string; value: Locale }[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Suomi',
    value: 'fi',
  },
];

export function localeValueToLabel(value: Locale) {
  return languageOptions.find((o) => o.value === value)?.label;
}

export default function LanguageSelect() {
  const { changeLocale, locale } = useI18n();

  const confirmLanguageChange = async (newLocale: Locale) => {
    if (newLocale === locale) return;
    const label = localeValueToLabel(newLocale);
    Alert.alert(
      t`Are you sure you want to change language to ${`"${label}"`}?`,
      t`Application will have to reload to apply changes`,
      [
        { text: t`Cancel`, style: 'cancel' },
        {
          text: t`Change language`,
          onPress: async () => await changeLocale(newLocale),
        },
      ],
    );
  };

  return (
    <Select
      label={t`Language`}
      value={locale}
      onChange={async (value) => {
        confirmLanguageChange(value as Locale);
      }}
      options={languageOptions}
    />
  );
}
