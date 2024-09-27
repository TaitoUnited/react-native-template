import isObject from 'lodash/isObject';
import {
  MMKV,
  useMMKVBoolean,
  useMMKVNumber,
  useMMKVObject,
  useMMKVString,
} from 'react-native-mmkv';

import config from '~constants/config';

const createStorageKey = (key: string) => `@${config.scheme}/${key}`;

// Add all your storage keys here
export const STORAGE_KEYS = {
  LOCALE: createStorageKey('locale'),
  ACCESS_TOKEN: createStorageKey('access-token'),
  REFRESH_TOKEN: createStorageKey('refresh-token'),
  COLOR_MODE: createStorageKey('color-mode'),
  APP_REVIEW_LAST_REQUESTED: createStorageKey('last-requested-review'),
  APP_REVIEW_DONE: createStorageKey('last-review-done'),
};

// Add all clearable storage keys here so they can be cleared on logout
const CLEARABLE_KEYS = [
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
] as const;

// These storage keys should be persisted across logins, e.g. showing some guided tours, etc.
const PERSISTENT_KEYS = [
  STORAGE_KEYS.LOCALE,
  STORAGE_KEYS.COLOR_MODE,
  STORAGE_KEYS.APP_REVIEW_DONE,
  STORAGE_KEYS.APP_REVIEW_LAST_REQUESTED,
] as const;

const clearableStorage = new MMKV({ id: 'clearable' });
const persistentStorage = new MMKV({ id: 'persistent' });

type Key = (typeof CLEARABLE_KEYS)[number] | (typeof PERSISTENT_KEYS)[number];

function getStorage(key: Key) {
  return PERSISTENT_KEYS.includes(key as any)
    ? persistentStorage
    : clearableStorage;
}

function set<T extends object | string | boolean | number>(key: Key, value: T) {
  try {
    const s = getStorage(key);
    if (isObject(value)) {
      s.set(key, JSON.stringify(value));
    } else {
      s.set(key, value);
    }
  } catch (error) {
    console.log(`> Failed to persist item: ${key}`, value, error);
  }
}

function getString(key: Key) {
  try {
    const s = getStorage(key);
    return s.getString(key);
  } catch (error) {
    console.log(`> Failed to get persisted string: ${key}`, error);
  }
}

function getNumber(key: Key) {
  return getStorage(key).getNumber(key);
}

function getBoolean(key: Key) {
  return getStorage(key).getBoolean(key);
}

function getObject<T>(key: Key): T | undefined {
  const value = getStorage(key).getString(key);
  return value ? JSON.parse(value) : undefined;
}

function remove(key: Key) {
  getStorage(key).delete(key);
}

function clearAll() {
  clearableStorage.clearAll();
}

const storage = {
  set,
  getString,
  getNumber,
  getBoolean,
  getObject,
  remove,
  clearAll,
};

export default storage;

export function useStorageString(key: Key) {
  return useMMKVString(key, getStorage(key));
}

export function useStorageNumber(key: Key) {
  return useMMKVNumber(key, getStorage(key));
}

export function useStorageBoolean(key: Key) {
  return useMMKVBoolean(key, getStorage(key));
}

export function useStorageObject<T>(key: Key) {
  return useMMKVObject<T>(key, getStorage(key));
}
