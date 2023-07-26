import { useEffect, useState } from 'react';
import { useRootNavigation, useRouter, useSegments } from 'expo-router';

import { useAuthStore } from '~services/auth';

export const useProtectedRoute = () => {
  const status = useAuthStore((s) => s.status);

  const segments = useSegments();
  const router = useRouter();

  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    console.log(`>> Here is the segments: ${inAuthGroup}`, status);
    if (
      // If the status is not signed in and the initial segment is not anything in the auth group.
      status === 'unauthenticated' &&
      !inAuthGroup
    ) {
      // Redirect to the auth group.
      router.replace('/(auth)/landing');
    } else if (status === 'authenticated') {
      // Redirect away from the auth group.
      router.replace('/(tabs)/home');
    }
  }, [status]);
};
