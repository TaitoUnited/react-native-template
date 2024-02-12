import { useEffect, useState } from 'react';
import { useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useFontsReady } from './font';
import { sleep } from './common';
import { initAuth } from '~services/auth';
import { initMessages } from '~services/i18n';

export function useAppReady() {
  const initReady = useInitReady();
  const fontsReady = useFontsReady();
  const routerReady = useRouterReady();
  const appReady = initReady && fontsReady && routerReady;

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

function useRouterReady() {
  const rootNavigation = useNavigationContainerRef();
  const [routerReady, setRouterReady] = useState(false);

  useEffect(() => {
    return rootNavigation?.addListener('state', () => {
      setRouterReady(true);
    });
  }, [rootNavigation]); // eslint-disable-line react-hooks/exhaustive-deps

  return routerReady;
}
