import { msg } from '@lingui/macro';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  checkMultiple,
  checkNotifications,
  openSettings,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions';
import create from 'zustand';

import { useAppState } from '~utils/observe';

import { useI18n } from './i18n';

const usePermissionStore = create<PermissionStore>((set, get) => ({
  status: 'pending',
  permissions: undefined,
  setPermissions: (status, permissions) => {
    const current = get().permissions;
    set({
      status,
      permissions: permissions || current,
    });
  },
}));

const OS = Platform.OS as 'ios' | 'android';

export function usePermissions() {
  const { _ } = useI18n();
  const { status, permissions, setPermissions } = usePermissionStore();

  const check = useCallback(async () => {
    try {
      const notification = await checkNotifications();
      const statuses = await checkMultiple(getPermissions(OS));

      setPermissions('success', {
        notification: notification.status === RESULTS.GRANTED,
        bluetooth: PERMISSION_CATEGORIES.bluetooth[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
        location: PERMISSION_CATEGORIES.location[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
        camera: PERMISSION_CATEGORIES.camera[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
        photo: PERMISSION_CATEGORIES.photo[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
        voice: PERMISSION_CATEGORIES.voice[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
        externalStorage: PERMISSION_CATEGORIES.externalStorage[OS].every(
          (p) => statuses[p] === RESULTS.GRANTED
        ),
      });
    } catch (error) {
      console.log('> Failed to check permissions', error);
      setPermissions('error');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const request = useCallback(
    async (category: PermissionCategory) => {
      const _openSettings = () => openSettings().catch(() => console.log('> Failed to open settings')); // prettier-ignore

      try {
        let statuses: any = {}; // TODO: fix type

        if (
          category === 'bluetooth' ||
          category === 'camera' ||
          category === 'location' ||
          category === 'photo' ||
          category === 'voice' ||
          category === 'externalStorage'
        ) {
          const permissionsToRequest = PERMISSION_CATEGORIES[category][OS];

          if (permissionsToRequest.length > 0) {
            statuses = await requestMultiple(permissionsToRequest);
          }
        } else if (category === 'notification') {
          statuses = await requestNotifications([
            'alert',
            'sound',
            'badge',
            'criticalAlert',
          ]);
        }

        if (Object.values(statuses).every((s) => s === RESULTS.GRANTED)) {
          // Update local state by running check again
          await check();
          return RESULTS.GRANTED;
        } else if (Object.values(statuses).some((s) => s === RESULTS.BLOCKED)) {
          Alert.alert(
            _(msg`Unable to change permission`),
            _(msg`You need to change the permission in the system settings.`),
            [
              { text: _(msg`Close`), style: 'cancel' },
              { text: _(msg`Open settings`), onPress: _openSettings },
            ]
          );

          return RESULTS.BLOCKED;
        }
      } catch (error) {
        console.log('> Failed to request permission', error);

        Alert.alert(
          _(msg`Something went wrong`),
          _(
            msg`Could not toggle permission. You can change the permission in the system settings.`
          ),
          [
            { text: _(msg`Close`), style: 'cancel' },
            { text: _(msg`Open settings`), onPress: _openSettings },
          ]
        );

        return RESULTS.DENIED;
      }

      return RESULTS.UNAVAILABLE;
    },
    [check] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const toggle = useCallback(
    async (category: PermissionCategory) => {
      if (!permissions) return;

      if (permissions[category]) {
        await openSettings();
      } else {
        await request(category);
      }
    },
    [permissions, request]
  );

  // Re-check permissions when app comes back to foreground eg. after the user
  // has changed a permission in the system settings
  useAppState({ onActive: check });

  return { status, permissions, check, request, toggle };
}

function getPermissions(platform: 'ios' | 'android') {
  return compact(
    flatten(
      Object.values(PERMISSION_CATEGORIES).map(
        (category) => category[platform] as any
      )
    )
  );
}

const PERMISSION_CATEGORIES: Record<
  string,
  Record<'ios' | 'android', Permission[]>
> = {
  camera: {
    ios: [PERMISSIONS.IOS.CAMERA],
    android: [PERMISSIONS.ANDROID.CAMERA],
  },
  photo: {
    ios: [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA],
    android: [PERMISSIONS.ANDROID.CAMERA],
  },
  location: {
    ios: [PERMISSIONS.IOS.LOCATION_ALWAYS],
    android: [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    ],
  },
  bluetooth: {
    ios: [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL],
    android:
      OS === 'android' && +Platform.Version > 30
        ? [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          ]
        : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  },
  voice: {
    ios: [PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.SPEECH_RECOGNITION],
    android: [PERMISSIONS.ANDROID.RECORD_AUDIO],
  },
  externalStorage: {
    ios: [],
    android: [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
  },
};

export type PermissionCategory =
  | 'notification'
  | 'bluetooth'
  | 'location'
  | 'camera'
  | 'photo'
  | 'voice'
  | 'externalStorage';

type PermissionState = Record<PermissionCategory, boolean>;

export type PermissionCheckStatus = 'pending' | 'success' | 'error';

type PermissionStore = {
  status: PermissionCheckStatus;
  permissions?: PermissionState;
  setPermissions: (
    status: PermissionCheckStatus,
    permissions?: PermissionState
  ) => void;
};
