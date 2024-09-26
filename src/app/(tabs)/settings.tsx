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
import { ComponentProps, FunctionComponent, useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import { useHeaderPlaygroundButton } from '~app/playground/utils';
import MenuList from '~components/common/MenuList';
import { showToast } from '~components/common/Toaster';
import { Icon, Text } from '~components/uikit';
import config from '~constants/config';
import { useAuthStore } from '~services/auth';
import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';

export default function Settings() {
  const { _ } = useI18n();
  const logout = useAuthStore((s) => s.logout);
  function handleLogout() {
    Alert.alert(_(msg`Are you sure you want to logout?`), '', [
      { text: _(msg`Cancel`), style: 'cancel' },
      { text: _(msg`I am sure`), onPress: logout },
    ]);
  }

  useHeaderPlaygroundButton();

  const items = [
    useMenuListItem({ targetName: 'LanguageMenuTarget' }),
    // useMenuListItem({ targetName: 'AppearanceMenuTarget' }), // We currently do not support dark mode, so until we do, we should not show this option
    useMenuListItem({ targetName: 'SystemInfoMenuTarget' }),
    {
      id: 'logout',
      targetName: 'LogoutButton',
      label: _(msg`Logout`),
      rightSlot: <Icon name="logout" color="textMuted" size={18} />,
      onPress: handleLogout,
    },
  ];

  return (
    <Wrapper testID="settingsScreen">
      <MenuList items={items} />
    </Wrapper>
  );
}

function LanguageMenuTarget() {
  const { setLocale, locale, _ } = useI18n();

  return (
    <MenuList
      items={[
        {
          id: 'en',
          label: _(msg`English`),
          checked: locale === 'en',
          onPress: () => setLocale('en'),
        },
        {
          id: 'fi',
          label: _(msg`Finnish`),
          checked: locale === 'fi',
          onPress: () => setLocale('fi'),
        },
      ]}
    />
  );
}

function AppearanceMenuTarget() {
  const { _ } = useI18n();
  const { setColorMode, colorMode } = useColorMode();

  return (
    <MenuList
      items={[
        {
          id: 'system',
          label: _(msg`Automatic`),
          checked: colorMode === 'system',
          onPress: () => setColorMode('system'),
        },
        {
          id: 'dark',
          label: _(msg`Dark`),
          checked: colorMode === 'dark',
          onPress: () => setColorMode('dark'),
        },
        {
          id: 'light',
          label: _(msg`Light`),
          checked: colorMode === 'light',
          onPress: () => setColorMode('light'),
        },
      ]}
    />
  );
}

function SystemInfoMenuTarget() {
  const { _ } = useI18n();
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeviceId() {
      const id =
        Platform.OS === 'android'
          ? getAndroidId()
          : await getIosIdForVendorAsync();
      setDeviceId(id);
    }
    fetchDeviceId();
  }, []);

  const items: ComponentProps<typeof MenuList>['items'] = [
    {
      id: 'deviceId',
      label: _(msg`Device ID`),
      currentValue: deviceId || _(msg`Fetching...`),
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

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));

export function useMenuListItem({ targetName }: { targetName: string }) {
  const { locale, _ } = useI18n();
  const { colorMode } = useColorMode();

  let label = '';
  let currentValue;
  let target: FunctionComponent<any> = () => <View />;

  switch (targetName) {
    case 'LanguageMenuTarget':
      label = _(msg`Language`);
      currentValue = locale === 'en' ? _(msg`English`) : _(msg`Suomi`);
      target = LanguageMenuTarget;
      break;
    case 'AppearanceMenuTarget':
      label = _(msg`Appearance`);
      currentValue =
        colorMode === 'light'
          ? _(msg`Light`)
          : colorMode === 'dark'
            ? _(msg`Dark`)
            : _(msg`Automatic`);
      target = AppearanceMenuTarget;
      break;
    case 'SystemInfoMenuTarget':
      label = _(msg`Info`);
      target = SystemInfoMenuTarget;
      break;
    default:
      break;
  }

  return {
    id: targetName,
    label,
    currentValue,
    target,
    targetName,
  };
}
