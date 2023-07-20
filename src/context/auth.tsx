import { t } from '@lingui/macro';
import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { showToast } from '~components/common/Toaster';
import storage from '~utils/storage';

type AuthStatus =
  | 'undetermined'
  | 'determining'
  | 'logging-in'
  | 'logging-out'
  | 'signing-in'
  | 'authenticated'
  | 'unauthenticated';

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

interface AuthContextValue {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider(props: ProviderProps) {
  const [status, setStatus] = React.useState<AuthStatus>('undetermined');
  const [authInitialized, setStatusInitialized] =
    React.useState<boolean>(false);

  const useProtectedRoute = (status: any | null) => {
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

    React.useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === '(auth)';

      if (!authInitialized) return;

      if (
        // If the status is not signed in and the initial segment is not anything in the auth group.
        status === 'unauthenticated' &&
        !inAuthGroup
      ) {
        // Redirect to the auth group.
        router.push('/(auth)/landing');
      } else if (status === 'authenticated' && inAuthGroup) {
        // Redirect away from the auth group.
        router.push('/(tabs)/home');
      }
    }, [status, segments, router, isNavigationReady]);
  };

  const logout = async (): Promise<void> => {
    setStatus('logging-out');

    try {
      await fakeLogout();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('unauthenticated');
    }

    // TODO: clear API client cache
    storage.clearAll();
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setStatus('logging-in');

    try {
      const tokens = await fakeLogin(credentials);
      setStatusTokens(tokens);
      setStatus('authenticated');
      setStatusInitialized(true);
    } catch (error) {
      setStatus('unauthenticated');
      throw error; // rethrow so caller can handle it
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setStatus('signing-in');

    try {
      const tokens = await fakeSignup(credentials);
      setStatusTokens(tokens);
      setStatus('authenticated');
      setStatusInitialized(true);
    } catch (error) {
      setStatus('unauthenticated');
      throw error; // rethrow so caller can handle it
    }
  };

  async function initAuth() {
    setStatus('determining');
    try {
      const accessToken = storage.getString('@app/access-token');

      if (!accessToken) {
        throw Error('No access token!');
      }

      // Check that the token is valid
      await fakeCheckAuth();

      setStatusInitialized(true);

      // In all other cases keep user logged in if the error is not auth error
      // since they might be able to resolve it by eg. connecting to the internet etc.
      setStatus('authenticated');
    } catch (error: any) {
      if (isAuthError(error)) {
        // Ignore auth errors here since they are handled in the GraphQL client
        // where the user will be logged out automatically
        console.log('> Auth error detected during auth check', error);
      } else if (error?.networkError) {
        showToast({ title: t`Could not connect to server`, type: 'error' });
      } else {
        console.log('> Unknown auth error', error);
        // Logout the user in case of unknown errors or if the access token is missing
        logout();
      }
    }
  }

  useProtectedRoute(status);

  return (
    <AuthContext.Provider
      value={{
        status,
        setStatus,
        signup,
        login,
        logout,
        initAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return authContext;
};

function setStatusTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  storage.clearAll();
  storage.set('@app/access-token', accessToken);
  storage.set('@app/refresh-token', refreshToken);
}

export function isAuthError(error: any) {
  return error?.graphQLErrors?.some((e: any) =>
    ['FORBIDDEN', 'UNAUTHENTICATED'].includes(e?.code)
  );
}

// Mock login functions --------------------------------------------------------

function fakeLogin(
  _credentials: LoginCredentials
): Promise<{ accessToken: string; refreshToken: string }> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ accessToken: '1234', refreshToken: '1234' }),
      1000
    )
  );
}

function fakeLogout(): Promise<{ ok: boolean }> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ ok: true }), 1000)
  );
}

function fakeSignup(
  _credentials: SignupCredentials
): Promise<{ accessToken: string; refreshToken: string }> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ accessToken: '1234', refreshToken: '1234' }),
      1000
    )
  );
}

function fakeCheckAuth() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
