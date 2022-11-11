import { ReactNode, useCallback } from 'react';
import { getLocales } from 'react-native-localize';
import { Settings } from 'luxon';
import { en, fi } from 'make-plural';
import { i18n } from '@lingui/core';
import { I18nProvider as LinguiProvider, useLingui } from '@lingui/react';
import storage from '~utils/storage';

export type Locale = 'fi' | 'en';

const LOCALES: Locale[] = ['fi', 'en'];

export async function initMessages() {
  const locales = getLocales();
  const persistedLocale = await storage.get<Locale>('@app/locale');
  const preferredLocale = locales[0];

  const defaultLocale = (
    LOCALES.some((l) => l === persistedLocale)
      ? persistedLocale
      : LOCALES.includes(preferredLocale.languageCode as Locale)
      ? preferredLocale.languageCode
      : 'en'
  ) as Locale;

  const defaultMessages =
    defaultLocale === 'fi'
      ? require('../locales/fi/messages').messages
      : require('../locales/en/messages').messages;

  i18n.loadLocaleData({ en: { plurals: en }, fi: { plurals: fi } });
  // i18n.loadLocaleData('en', { plurals: en });
  // i18n.loadLocaleData('fi', { plurals: fi });

  i18n.load(defaultLocale, defaultMessages);
  i18n.activate(defaultLocale);
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

  const changeLocale = useCallback(
    async (locale: Locale) => {
      try {
        const newMessages = await loadMessages(locale);
        lingui.i18n.load(locale, newMessages);
        lingui.i18n.activate(locale);
        Settings.defaultLocale = locale;
        await storage.set('@app/locale', locale);
      } catch (error) {
        console.log(`> Failed to load messages for locale: ${locale}`, error);
      }
    },
    [lingui]
  );

  const toggleLocale = useCallback(() => {
    changeLocale(currentLocale === 'fi' ? 'en' : 'fi');
  }, [currentLocale, changeLocale]);

  return {
    i18n: lingui.i18n,
    locale: currentLocale,
    changeLocale,
    toggleLocale,
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>;
}
