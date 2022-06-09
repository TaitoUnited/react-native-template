import React from 'react';

import LoginNavigator from '../login';
import AppNavigator from './AppNavigator';
import { useAuthInit } from '~services/auth';

export default function RootNavigator() {
  const status = useAuthInit();

  // Render nothing while we are checking auth
  if (status === 'undetermined' || status === 'determining') return null;

  if (status === 'authenticated') {
    return <AppNavigator />;
  }

  return <LoginNavigator />;
}
