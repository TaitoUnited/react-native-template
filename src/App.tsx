import React from 'react';

import Providers from './Providers';
import RootNavigator from './screens/root';
import { useInitLocale } from '~services/i18n';

export default function App() {
  const initialized = useInitLocale();

  if (!initialized) return null;

  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
