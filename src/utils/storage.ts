import { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCALE = '@app/locale';
const ACCESS_TOKEN = '@app/access-token';
const REFRESH_TOKEN = '@app/refresh-token';
const PERMISSION_REQUESTS = '@app/permission-requests';
const COLOR_MODE = '@app/color-mode';
const NAVIGATION_STATE = '@app/navigation-state';

// Add all storage keys here so that they can be cleared upon logout
const CLEARABLE_KEYS = [ACCESS_TOKEN, REFRESH_TOKEN, NAVIGATION_STATE] as const;

// These storage keys should be persisted across logins, eg. showing some guided tours etc.
const PERSISTENT_KEYS = [LOCALE, PERMISSION_REQUESTS, COLOR_MODE] as const;

type Key = typeof CLEARABLE_KEYS[number] | typeof PERSISTENT_KEYS[number];

async function set<T extends object | string | boolean>(key: Key, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`> Failed to persist item: ${key}`, value, error);
  }
}

async function get<T>(key: Key): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(`> Failed to get persisted item: ${key}`, error);
    return null;
  }
}

async function remove(key: Key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`> Failed to clear persisted item: ${key}`, error);
  }
}

async function clearAll() {
  try {
    await AsyncStorage.multiRemove(CLEARABLE_KEYS as any);
  } catch (error) {
    console.log('> Failed to clear all persisted values', error);
  }
}

export function useStorageState<T extends object | string | boolean>(
  key: Parameters<typeof storage.get>[0],
  initial: T | null = null
) {
  const [state, setState] = useState<T | null>(initial);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      const persistedState = await storage.get<T | null>(key);
      if (persistedState !== null) setState(persistedState);
      setInitialized(true);
    }

    init();
  }, [key]);

  return useMemo(
    () => ({
      initialized,
      state,
      setState: async (newState: T) => {
        setState(newState);
        await storage.set(key, newState);
      },
    }),
    [state, initialized, key]
  );
}

const storage = {
  set,
  get,
  remove,
  clearAll,
};

export default storage;
