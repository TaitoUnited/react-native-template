import { useLingui } from '@lingui/react/macro';
import {
  applicationId,
  getAndroidId,
  getIosIdForVendorAsync,
  nativeApplicationVersion,
} from 'expo-application';
import { setStringAsync } from 'expo-clipboard';
import { modelName, osVersion, platformApiLevel } from 'expo-device';
import { updateId as expoUpdateId } from 'expo-updates';
import capitalize from 'lodash/capitalize';
import { useEffect, useState, type ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import MenuList from '~components/common/MenuList';
import { showToast } from '~components/common/Toaster';
import { Text } from '~components/uikit';
import config from '~constants/config';
import { haptics } from '~utils/haptics';

export function SystemInfoMenuTarget() {
  const { t } = useLingui();
  const { deviceId, loading } = useDeviceId();

  const items: ComponentProps<typeof MenuList>['items'] = [
    {
      id: 'deviceId',
      label: t`Device ID`,
      currentValue: loading ? t`Fetching...` : deviceId || t`Unavailable`,
    },
    {
      id: 'modelName',
      label: t`Model name`,
      currentValue: modelName,
    },
    {
      id: 'systemVersion',
      label: t`System version`,
      currentValue: osVersion,
    },
    {
      id: 'apiLevel',
      label: t`API level`,
      currentValue: platformApiLevel,
      platform: 'android',
    },
    {
      id: 'version',
      label: t`Version`,
      currentValue: nativeApplicationVersion,
    },
    {
      id: 'environment',
      label: t`App environment`,
      currentValue: capitalize(config.appEnv),
    },
  ];

  const updateId = expoUpdateId;

  if (updateId) {
    items.push({
      id: 'updateId',
      label: t`Update ID`,
      currentValue: (
        <TouchableOpacity
          accessibilityRole="button"
          onLongPress={async () => {
            haptics.notificationSuccess();
            await setStringAsync(updateId);
            showToast({
              title: t`Copied to clipboard`,
              type: 'success',
              icon: 'check',
            });
          }}
        >
          <Text variant="body" color="textMuted" numberOfLines={1}>
            {updateId.substring(0, 8)}
          </Text>
        </TouchableOpacity>
      ),
    });
  }

  if (config.appEnv !== 'prod') {
    items.push({
      id: 'bundleId',
      label: t`Bundle ID`,
      currentValue: applicationId,
    });
  }

  return <MenuList items={items} />;
}

function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDeviceId() {
      try {
        const id =
          Platform.OS === 'android'
            ? getAndroidId()
            : await getIosIdForVendorAsync();
        setDeviceId(id);
      } catch (error) {
        console.error('Failed to fetch device ID:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeviceId();
  }, []);

  return { deviceId, loading };
}
