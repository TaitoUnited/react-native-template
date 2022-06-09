import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Alert, AppState, AppStateStatus } from 'react-native';
import { t } from '@lingui/macro';

import {
  RESULTS,
  openSettings,
  checkMultiple,
  checkNotifications,
  requestMultiple,
  requestNotifications,
  PermissionStatus,
  NotificationSettings,
  PERMISSIONS,
  Permission,
} from 'react-native-permissions';

type PermissionCategory = 'notification' | 'photo';

type PermissionState = {
  status: 'pending' | 'success' | 'error';
  permissions?: Record<PermissionCategory, boolean>;
};

type PermissionRequestResultMap = Record<
  any,
  PermissionStatus | NotificationSettings
>;

const PERMISSION_CATEGORIES = {
  photo: {
    ios: [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA] as Permission[], // prettier-ignore
    android: [PERMISSIONS.ANDROID.CAMERA] as Permission[],
  },
  // Add more permissions if needed, eg: bluetooth, location, microphone, etc.
};

const OS = Platform.OS as 'ios' | 'android';

export function usePermissions() {
  const [state, setState] = useState<PermissionState>({
    status: 'pending',
    permissions: undefined,
  });

  const check = useCallback(async () => {
    try {
      const notification = await checkNotifications();
      const statuses = await checkMultiple(getPermissions(OS));

      setState({
        status: 'success',
        permissions: {
          notification: notification.status === RESULTS.GRANTED,
          photo: PERMISSION_CATEGORIES.photo[OS].every(
            (p) => statuses[p] === RESULTS.GRANTED,
          ),
        },
      });
    } catch (error) {
      console.log('> Failed to check permissions', error);
      setState((p) => ({ ...p, status: 'error' }));
    }
  }, []);

  const request = useCallback(
    async (category: PermissionCategory) => {
      const _openSettings = () =>
        openSettings().catch(() => console.log('> Failed to open settings'));

      try {
        let statuses: PermissionRequestResultMap = {};

        if (category === 'photo') {
          statuses = await requestMultiple(PERMISSION_CATEGORIES[category][OS]);
        } else if (category === 'notification') {
          statuses = await requestNotifications(['alert', 'sound', 'badge']);
        }

        if (Object.values(statuses).every((s) => s === RESULTS.GRANTED)) {
          // Update local state by running check again
          await check();
          return RESULTS.GRANTED;
        } else if (Object.values(statuses).some((s) => s === RESULTS.BLOCKED)) {
          Alert.alert(
            t`Unable to change permission`,
            t`You need to change the permission in the system settings.`,
            [
              { text: t`Close`, style: 'cancel' },
              { text: t`Open settings`, onPress: _openSettings },
            ],
          );

          return RESULTS.BLOCKED;
        }
      } catch (error) {
        console.log('> Failed to request permission', error);

        Alert.alert(
          t`Something went wrong`,
          t`Could not toggle permission. You can change the permission in the system settings.`,
          [
            { text: t`Close`, style: 'cancel' },
            { text: t`Open settings`, onPress: _openSettings },
          ],
        );

        return RESULTS.DENIED;
      }

      return RESULTS.UNAVAILABLE;
    },
    [check],
  );

  const toggle = useCallback(
    async (category: PermissionCategory) => {
      if (!state.permissions) return;

      if (state.permissions[category]) {
        await openSettings();
      } else {
        await request(category);
      }
    },
    [state, request],
  );

  // Re-check permissions when app comes back to foreground eg. after the user
  // has changed a permission in the system settings
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        check();
      }

      appState.current = nextAppState;
    };

    const sub = AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      sub.remove();
    };
  }, [check]);

  useEffect(() => {
    check();
  }, []); // eslint-disable-line

  return { ...state, check, request, toggle };
}

function getPermissions(platform: 'ios' | 'android') {
  return Object.values(PERMISSION_CATEGORIES)
    .map((category) => category[platform])
    .flat()
    .filter(Boolean) as Permission[];
}
