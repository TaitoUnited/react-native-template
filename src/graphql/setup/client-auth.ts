import { makeOperation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';

import { REFRESH_TOKEN_MUTATION } from '../user/mutations.gql';
import { isAuthError } from '~services/auth';
import storage from '~utils/storage';

import type {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '~graphql/generated';

// Based on https://formidable.com/open-source/urql/docs/advanced/authentication/#installation--setup

type AuthExchangeParams = Parameters<typeof authExchange>[0];

type AuthState = null | {
  accessToken: string;
  refreshToken: string;
};

const getAuth: AuthExchangeParams['getAuth'] = async ({
  authState,
  mutate,
}) => {
  const state = authState as AuthState;

  if (!state) {
    const accessToken = await storage.get('@app/access-token');
    const refreshToken = await storage.get('@app/refresh-token');
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  }

  // If we reach this far it means that we have some auth error determined by
  // `didAuthError` so we should try to refresh the auth token

  const result = await mutate<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(REFRESH_TOKEN_MUTATION, { refreshToken: state.refreshToken });

  if (result.data?.refreshUserTokens) {
    const { accessToken, refreshToken } = result.data.refreshUserTokens;
    await storage.set('@app/access-token', accessToken);
    await storage.set('@app/refresh-token', refreshToken);
    return { accessToken, refreshToken };
  }

  return null;
};

const addAuthToOperation: AuthExchangeParams['addAuthToOperation'] = ({
  authState,
  operation,
}) => {
  const state = authState as AuthState;

  if (!state || !state.accessToken) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${state.accessToken}`,
      },
    },
  });
};

const willAuthError: AuthExchangeParams['willAuthError'] = ({ authState }) => {
  return !authState;
};

const didAuthError: AuthExchangeParams['didAuthError'] = ({ error }) => {
  return isAuthError(error);
};

const exchange = authExchange({
  getAuth,
  addAuthToOperation,
  willAuthError,
  didAuthError,
});

export default exchange;
