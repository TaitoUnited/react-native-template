import { create } from 'zustand';

import storage, { STORAGE_KEYS } from '~utils/storage';

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
    const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);

    if (!accessToken) {
      throw Error('No access token!');
    }

    // Check that the token is valid
    await fakeCheckAuth();

    // In all other cases keep user logged in if the error is not auth error
    // since they might be able to resolve it by eg. connecting to the internet etc.
    authStore.setState({ status: 'authenticated' });
  } catch (error: unknown) {
    console.log('> Unknown auth error', error);
    // Logout the user in case of unknown errors or if the access token is missing
    authStore.getState().logout();
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
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
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
