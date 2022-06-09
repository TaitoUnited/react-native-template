import { unstable_batchedUpdates } from 'react-native'; // eslint-disable-line
import { useEffect } from 'react';
import { useClient } from 'urql';
import { t } from '@lingui/macro';
import create from 'zustand';
import BootSplash from 'react-native-bootsplash';

import type {
  CurrentUserQuery,
  CurrentUserQueryVariables,
  LoginMutation,
  LoginMutationVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from '~graphql/generated';

import {
  LOGIN_MUTATION,
  REGISTER_USER_MUTATION,
} from '~graphql/user/mutations.gql';

import storage from '~utils/storage';
import { clearClient, getClient } from '~graphql';
import { CURRENT_USER_QUERY } from '~graphql/user/queries.gql';
import { showToast } from '~components/common/Toaster';

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

export const useAuthStore = create<AuthState>((set) => ({
  tokens: null,
  status: 'undetermined',
  setStatus: (status) => set({ status }),
  signup: async (credentials) => {
    set({ status: 'signing-in' });

    try {
      const result = await getClient()
        .mutation<RegisterUserMutation, RegisterUserMutationVariables>(
          REGISTER_USER_MUTATION,
          { input: credentials },
        )
        .toPromise();

      if (!result.data?.registerUser) {
        const error = result.error?.graphQLErrors[0];
        throw Error(error?.message || 'Failed to register user');
      }

      const { accessToken, refreshToken } = result.data.registerUser;

      await storage.clearAll();
      await storage.set('@app/access-token', accessToken);
      await storage.set('@app/refresh-token', refreshToken);

      set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  login: async (credentials) => {
    set({ status: 'logging-in' });

    try {
      const result = await getClient()
        .mutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
          input: credentials,
        })
        .toPromise();

      if (!result.data?.loginUser) {
        throw Error('No login result!');
      }

      const { accessToken, refreshToken } = result.data.loginUser;

      await storage.clearAll();
      await storage.set('@app/access-token', accessToken);
      await storage.set('@app/refresh-token', refreshToken);

      set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  logout: async () => {
    set({ status: 'unauthenticated' });

    // Clear client and storage
    await clearClient();
    await storage.clearAll();
  },
}));

export function useAuthInit() {
  const client = useClient();
  const status = useAuthStore((s) => s.status);
  const logout = useAuthStore((s) => s.logout);
  const setStatus = useAuthStore((s) => s.setStatus);

  useEffect(() => {
    async function init() {
      setStatus('determining');

      try {
        const accessToken = await storage.get('@app/access-token');

        if (!accessToken) {
          throw Error('No access token!');
        }

        // Query some data to check if the user is authenticated
        const { error } = await client
          .query<CurrentUserQuery, CurrentUserQueryVariables>(
            CURRENT_USER_QUERY,
          )
          .toPromise();

        if (isAuthError(error)) {
          // Ignore auth errors here since they are handled in the GraphQL client
          // where the user will be logged out automatically
          console.log('> Auth error detected during auth check'); // prettier-ignore
          return;
        }

        // In all other cases keep user logged in if the error is not auth error
        // since they might be able to resolve it by eg. connecting to the internet etc.
        setStatus('authenticated');

        if (error?.networkError) {
          showToast({ title: t`Could not connect to server`, type: 'error' });
        } else if (error) {
          console.log('> Unknown auth error', error);
        }
      } catch (error) {
        // Logout the user in case of unknown errors or if the access token is missing
        logout();
      } finally {
        BootSplash.hide({ fade: true });
      }
    }

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return status;
}

export function isAuthError(error: any) {
  return error?.graphQLErrors.some((e: any) =>
    ['FORBIDDEN', 'UNAUTHENTICATED'].includes(e?.code),
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
