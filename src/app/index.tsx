import { Redirect, useRootNavigationState } from 'expo-router';
import { useAuth } from '../context/auth';

export default function RootPage() {
  const { status } = useAuth();

  // Workaround to avoid navigating before the navigator is ready (seen from https://github.com/expo/router/issues/740#issuecomment-1626015285)
  const rootNavigationState = useRootNavigationState();

  // Render nothing while we are checking auth
  if (
    status === 'undetermined' ||
    status === 'determining' ||
    !rootNavigationState?.key
  )
    return null;

  if (status === 'authenticated') {
    return <Redirect href="/home" />;
  }

  return <Redirect href="(auth)/landing" />;
}
