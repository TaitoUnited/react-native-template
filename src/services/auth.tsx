import { t } from '@lingui/macro';
import { unstable_batchedUpdates } from 'react-native'; // eslint-disable-line
import create from 'zustand';

import { showToast } from '~components/common/Toaster';
import storage, {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '~utils/storage';

type AuthStatus =
  | 'undetermined'
  | 'determining'
  | 'logging-in'
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

type AuthState = {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const authStore = create<AuthState>((set) => ({
  tokens: null,
  status: 'undetermined',
  setStatus: (status) => set({ status }),
  signup: async (credentials) => {
    set({ status: 'signing-in' });

    try {
      const tokens = await fakeSignup(credentials);
      setAuthTokens(tokens);
      set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  login: async (credentials) => {
    set({ status: 'logging-in' });

    try {
      const tokens = await fakeLogin(credentials);
      setAuthTokens(tokens);
      set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  logout: async () => {
    set({ status: 'unauthenticated' });
    try {
      await fakeLogout();
    } catch (error) {
      console.log(error);
    }

    // TODO: clear API client cache
    storage.clearAll();
  },
}));

export const useAuthStore = authStore;

export async function initAuth() {
  authStore.setState({ status: 'determining' });

  try {
    const accessToken = storage.getString(ACCESS_TOKEN_STORAGE_KEY);

    if (!accessToken) {
      throw Error('No access token!');
    }

    // Check that the token is valid
    await fakeCheckAuth();

    // In all other cases keep user logged in if the error is not auth error
    // since they might be able to resolve it by eg. connecting to the internet etc.
    authStore.setState({ status: 'authenticated' });
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
      authStore.getState().logout();
    }
  }
}

function setAuthTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  storage.clearAll();
  storage.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
}

export function isAuthError(error: any) {
  return error?.graphQLErrors?.some((e: any) =>
    ['FORBIDDEN', 'UNAUTHENTICATED'].includes(e?.code)
  );
}

// This is used to automatically logout the user if the GraphQL client encounters an auth error
export function handleAuthError(error: any) {
  if (isAuthError(error)) {
    // https://github.com/pmndrs/zustand#calling-actions-outside-a-react-event-handler
    unstable_batchedUpdates(() => {
      useAuthStore
        .getState()
        .logout()
        .catch((e) => console.log('> Failed handle auth error', e));
    });
  }
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
