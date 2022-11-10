import React from 'react';

import UnauthedNavigator from '../unauthed';
import AppNavigator from './AppNavigator';
import { useAuthStore } from '~services/auth';

export default function RootNavigator() {
  const status = useAuthStore((s) => s.status);

  // Render nothing while we are checking auth
  if (status === 'undetermined' || status === 'determining') return null;

  if (status === 'authenticated') {
    return <AppNavigator />;
  }

  return <UnauthedNavigator />;
}
