import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = '@app/access-token';
const REFRESH_TOKEN = '@app/refresh-token';
const LOCALE = '@app/locale';

// Add all storage keys here so that they can be cleared upon logout
const CLEARABLE_KEYS = [ACCESS_TOKEN, REFRESH_TOKEN, LOCALE] as const;

// These storage keys should be persisted across logins, eg. showing some guided tours etc.
const PERSISTENT_KEYS = [] as const;

type Key = typeof CLEARABLE_KEYS[number] | typeof PERSISTENT_KEYS[number];

const set = async (key: Key, value: object | string | boolean) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`> Failed to persist item: ${key}`, value, error);
  }
};

const get = async (key: Key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(`> Failed to get persisted item: ${key}`, error);
    return null;
  }
};

const remove = async (key: Key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`> Failed to clear persisted item: ${key}`, error);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.multiRemove(CLEARABLE_KEYS as any);
  } catch (error) {
    console.log('> Failed to clear all persisted values', error);
  }
};

export function useStorageState<T extends object | string | boolean>(
  key: Parameters<typeof storage.get>[0],
  initial: T | null = null,
) {
  const [state, setState] = React.useState<T | null>(initial);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    async function init() {
      const persistedState = await storage.get(key);
      if (persistedState !== null) setState(persistedState);
      setInitialized(true);
    }

    init();
  }, [key]);

  return React.useMemo(
    () => ({
      initialized,
      state,
      setState: async (newState: T) => {
        setState(newState);
        await storage.set(key, newState);
      },
    }),
    [state, initialized, key],
  );
}

const storage = {
  set,
  get,
  remove,
  clearAll,
};

export default storage;
