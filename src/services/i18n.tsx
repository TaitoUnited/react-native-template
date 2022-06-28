import { ReactNode, useEffect, useState } from 'react';
import { en, fi } from 'make-plural';
import { i18n } from '@lingui/core';
import { I18nProvider as LinguiProvider, useLingui } from '@lingui/react';
import { Settings } from 'luxon';

import { messages } from '../locales/en/messages';
import storage from '~utils/storage';

export type Locale = 'fi' | 'en';

const defaultLocale: Locale = 'en';

export const LOCALES = ['fi', 'en'];

async function initLocale() {
  let persistedLocale = 'en';

  try {
    persistedLocale = await storage.get('@app/locale');
  } catch (error) {
    console.log('> Failed to get persisted locale', error);
  }

  const locale = LOCALES.includes(persistedLocale)
    ? persistedLocale
    : defaultLocale;

  i18n.loadLocaleData({ en: { plurals: en }, fi: { plurals: fi } });
  i18n.load(locale, messages);
  i18n.activate(locale);
  Settings.defaultLocale = locale;
}

export function useInitLocale() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initLocale().then(() => setInitialized(true));
  }, []);

  return initialized;
}

async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'fi':
      return require('../locales/fi/messages').messages;
    case 'en':
      return messages;
    default:
      throw Error(`Unkown locale: ${locale}`);
  }
}

export function useI18n() {
  const lingui = useLingui();

  async function changeLocale(locale: Locale) {
    await storage.set('@app/locale', locale);

    try {
      const newMessages = await loadMessages(locale);
      lingui.i18n.load(locale, newMessages);
      lingui.i18n.activate(locale);
      Settings.defaultLocale = locale;
    } catch (error) {
      console.log(`> Failed to load messages for locale: ${locale}`, error);
    }
  }

  return {
    i18n: lingui.i18n,
    locale: lingui.i18n.locale as Locale,
    changeLocale,
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>;
}
