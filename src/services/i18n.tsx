import { i18n } from '@lingui/core';
import { I18nProvider as LinguiProvider, useLingui } from '@lingui/react';
import { Settings } from 'luxon';
import { getLocales } from 'react-native-localize';

import { useEffectEvent } from '~utils/common';
import storage, { LOCALE_STORAGE_KEY } from '~utils/storage';

export type Locale = 'fi' | 'en';
const LOCALES: Locale[] = ['fi', 'en'];

export async function initMessages() {
  const locales = getLocales();
  const persistedLocale = storage.getString(LOCALE_STORAGE_KEY) as Locale;
  const preferredLocale = locales[0];
  const defaultLocale: Locale = LOCALES.includes(persistedLocale)
    ? persistedLocale
    : LOCALES.includes(preferredLocale.languageCode as Locale)
      ? (preferredLocale.languageCode as Locale)
      : 'en';

  const defaultMessages = await loadMessages(defaultLocale);

  i18n.loadAndActivate({ locale: defaultLocale, messages: defaultMessages });
  storage.set(LOCALE_STORAGE_KEY, defaultLocale);
  Settings.defaultLocale = defaultLocale;
}

async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'fi':
      return require('../locales/fi/messages').messages;
    case 'en':
      return require('../locales/en/messages').messages;
    default:
      throw Error(`Unkown locale: ${locale}`);
  }
}

export function useI18n() {
  const lingui = useLingui();
  const currentLocale = lingui.i18n.locale as Locale;

  const setLocale = useEffectEvent(async (locale: Locale) => {
    try {
      const newMessages = await loadMessages(locale);
      i18n.loadAndActivate({ locale, messages: newMessages });

      Settings.defaultLocale = locale;
      storage.set(LOCALE_STORAGE_KEY, locale);
    } catch (error) {
      console.log(`> Failed to load messages for locale: ${locale}`, error);
    }
  });

  return {
    i18n: lingui.i18n,
    locale: currentLocale,
    setLocale,
    _: lingui._,
  };
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>;
}
