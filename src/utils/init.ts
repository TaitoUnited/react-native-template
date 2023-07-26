import { useEffect, useState } from 'react';

import { SplashScreen } from 'expo-router';

import { useAppFonts } from './font';
import { initAuth } from '~services/auth';
import { initMessages } from '~services/i18n';

export function useAppReady() {
  const [initReady, setInitReady] = useState(false);
  const fontsReady = useAppFonts();

  useEffect(() => {
    async function init() {
      await initMessages();
      await initAuth();
      setInitReady(true);
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const appReady = initReady && fontsReady;

  useEffect(() => {
    if (!appReady) return;
    SplashScreen.hideAsync();
  }, [appReady]);

  return appReady;
}
