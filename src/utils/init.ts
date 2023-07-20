import { useEffect, useState } from 'react';

import { useAppFonts } from './font';
import { initMessages } from '~services/i18n';

export function useAppReady() {
  const [initReady, setInitReady] = useState(false);
  const fontsReady = useAppFonts();

  useEffect(() => {
    async function init() {
      await initMessages();
      setInitReady(true);
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const appReady = initReady && fontsReady;

  return appReady;
}
