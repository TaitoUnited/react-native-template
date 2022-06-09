import create from 'zustand';
import { unstable_batchedUpdates } from 'react-native'; // eslint-disable-line
import { makeAsyncStorage } from '@urql/storage-rn';
import { offlineExchange } from '@urql/exchange-graphcache';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { createClient, dedupExchange, errorExchange, Provider } from 'urql';

import schema from '../schema.json';
import authExchange from './client-auth';
import fetchOptionsExchange from './client-fetch-options';
import * as cacheUpdates from './cache-updates';
import { handleAuthError } from '~services/auth';
import config from '~constants/config';
import storage from '~utils/storage';

const clientStorage = makeAsyncStorage({
  dataKey: '@app/urql-data',
  metadataKey: '@app/urql-metadata',
  maxAge: 7, // How long to persist the data in storage (in days)
});

const cache = offlineExchange({
  schema: schema as any,
  storage: clientStorage,
  keys: {
    PaginatedLocalizedProfiles: () => null,
    PaginatedAttachments: () => null,
    AttachmentUploadRequestDetails: () => null,
    ProfileGender: () => null,
    ProfileAttribute: () => null,
    ProfileSkinColor: () => null,
    ProfileBuildType: () => null,
    ProfileHairColor: () => null,
    ProfileHairStyle: () => null,
    ProfileActorType: () => null,
    ProfileClothingSize: () => null,
    ProjectLocalType: () => null,
    RoleLocalType: () => null,
    Variants: () => null,
    FileUrl: () => null,
  },
  updates: {
    Mutation: cacheUpdates,
  },
  optimistic: {
    /* ... */
  },
});

function makeClient() {
  return createClient({
    url: config.API_URL,
    exchanges: [
      dedupExchange,
      requestPolicyExchange({
        // Upgrade queries from `cache-firts` to `cache-and-network` after certain
        // time to keep the data fresh
        ttl: 10 * 60 * 1000, // 10 minutes
      }),
      cache,
      errorExchange({
        onError: (error) => {
          handleAuthError(error);
        },
      }),
      authExchange,
      // NOTE: use this exchange to add non-auth related headers to the request
      fetchOptionsExchange(async (fetchOptions) => {
        const locales = ['en', 'fi'];
        const locale = await storage.get('@app/locale');

        const options = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            'Accept-Language': locales.includes(locale) ? locale : 'fi',
          },
        };

        return options;
      }),
      multipartFetchExchange,
    ],
  });
}

type Client = ReturnType<typeof createClient>;

type ClientState = {
  client: Client;
  clearClient: () => Promise<void>;
};

// Store GraphQL client in a store so that we can easily clear it upon logout
export const useClientStore = create<ClientState>((set) => ({
  client: makeClient(),
  clearClient: async () => {
    try {
      await clientStorage.clear();
    } catch (error) {
      console.log('> Failed to clear client storage', error);
    }

    set({ client: makeClient() });
  },
}));

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const client = useClientStore((s) => s.client);
  return <Provider value={client}>{children}</Provider>;
}

export function getClient() {
  return useClientStore.getState().client;
}

export function clearClient() {
  return new Promise((resolve, reject) => {
    // https://github.com/pmndrs/zustand#calling-actions-outside-a-react-event-handler
    unstable_batchedUpdates(() => {
      useClientStore.getState().clearClient().then(resolve).catch(reject);
    });
  });
}
