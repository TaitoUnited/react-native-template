import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { initAuth } from '~services/auth';
import { initMessages } from '~services/i18n';

import { sleep } from './common';
import { useFontsReady } from './font';

export function useAppReady() {
  const initReady = useInitReady();
  const fontsReady = useFontsReady();
  const appReady = initReady && fontsReady;

  useEffect(() => {
    if (appReady) sleep(10).then(() => SplashScreen.hideAsync());
  }, [appReady]);

  return appReady;
}

function useInitReady() {
  const [initReady, setInitReady] = useState(false);

  useEffect(() => {
    async function init() {
      await initMessages();
      await initAuth();
      setInitReady(true);
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return initReady;
}
