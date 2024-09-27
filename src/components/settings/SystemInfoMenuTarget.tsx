import { msg } from '@lingui/macro';
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
import { ComponentProps, useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import MenuList from '~components/common/MenuList';
import { showToast } from '~components/common/Toaster';
import { Text } from '~components/uikit';
import config from '~constants/config';
import { useI18n } from '~services/i18n';

export function SystemInfoMenuTarget() {
  const { _ } = useI18n();
  const { deviceId, loading } = useDeviceId();

  const items: ComponentProps<typeof MenuList>['items'] = [
    {
      id: 'deviceId',
      label: _(msg`Device ID`),
      currentValue: loading
        ? _(msg`Fetching...`)
        : deviceId || _(msg`Unavailable`),
    },
    {
      id: 'modelName',
      label: _(msg`Model name`),
      currentValue: modelName,
    },
    {
      id: 'systemVersion',
      label: _(msg`System version`),
      currentValue: osVersion,
    },
    {
      id: 'apiLevel',
      label: _(msg`API level`),
      currentValue: platformApiLevel,
      platform: 'android',
    },
    {
      id: 'version',
      label: _(msg`Version`),
      currentValue: nativeApplicationVersion,
    },
    {
      id: 'environment',
      label: _(msg`App environment`),
      currentValue: capitalize(config.appEnv),
    },
  ];

  const updateId = expoUpdateId;

  if (updateId) {
    items.push({
      id: 'updateId',
      label: _(msg`Update ID`),
      currentValue: (
        <TouchableOpacity
          onLongPress={async () => {
            await setStringAsync(updateId);
            showToast({
              title: _(msg`Copied to clipboard`),
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
      label: _(msg`Bundle ID`),
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
