import { t } from '@lingui/macro';
import { setStringAsync } from 'expo-clipboard';
import { updateId as expoUpdateId } from 'expo-updates';
import capitalize from 'lodash/capitalize';
import { ComponentProps, FunctionComponent } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import {
  getApiLevelSync,
  getReadableVersion,
  getSystemName,
  getSystemVersion,
  getUniqueIdSync,
} from 'react-native-device-info';

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
  const logout = useAuthStore((s) => s.logout);
  function handleLogout() {
    Alert.alert(t`Are you sure you want to logout?`, '', [
      { text: t`Cancel`, style: 'cancel' },
      { text: t`I am sure`, onPress: logout },
    ]);
  }

  useHeaderPlaygroundButton();

  const items = [
    useMenuListItem('LanguageMenuTarget'),
    useMenuListItem('AppearanceMenuTarget'),
    useMenuListItem('SystemInfoMenuTarget'),
    {
      id: 'logout',
      targetName: 'LogoutButton',
      label: t`Logout`,
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
  const { setLocale, locale } = useI18n();

  return (
    <MenuList
      items={[
        {
          id: 'en',
          label: t`English`,
          checked: locale === 'en',
          onPress: () => setLocale('en'),
        },
        {
          id: 'fi',
          label: t`Finnish`,
          checked: locale === 'fi',
          onPress: () => setLocale('fi'),
        },
      ]}
    />
  );
}

function AppearanceMenuTarget() {
  const { setColorMode, colorMode } = useColorMode();

  return (
    <MenuList
      items={[
        {
          id: 'system',
          label: t`Automatic`,
          checked: colorMode === 'system',
          onPress: () => setColorMode('system'),
        },
        {
          id: 'dark',
          label: t`Dark`,
          checked: colorMode === 'dark',
          onPress: () => setColorMode('dark'),
        },
        {
          id: 'light',
          label: t`Light`,
          checked: colorMode === 'light',
          onPress: () => setColorMode('light'),
        },
      ]}
    />
  );
}

function SystemInfoMenuTarget() {
  const items: ComponentProps<typeof MenuList>['items'] = [
    {
      id: 'deviceId',
      label: 'Device ID',
      currentValue: getUniqueIdSync(),
    },
    {
      id: 'systemName',
      label: 'System name',
      currentValue: getSystemName(),
    },
    {
      id: 'systemVersion',
      label: 'System version',
      currentValue: getSystemVersion(),
    },
    {
      id: 'apiLevel',
      label: 'API level',
      currentValue: getApiLevelSync(),
      platform: 'android',
    },
    {
      id: 'appEnv',
      label: 'App environment',
      currentValue: config.appEnv,
    },
    {
      id: 'version',
      label: t`Version`,
      currentValue: getReadableVersion(),
    },
    {
      id: 'environment',
      label: t`Environment`,
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
          onLongPress={async () => {
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

  return <MenuList items={items} />;
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));

export function useMenuListItem(targetName: string) {
  const { locale } = useI18n();
  const { colorMode } = useColorMode();

  let label = '';
  let currentValue;
  let target: FunctionComponent<any> = () => <View />;

  switch (targetName) {
    case 'LanguageMenuTarget':
      label = t`Language`;
      currentValue = locale === 'en' ? 'English' : 'Suomi';
      target = LanguageMenuTarget;
      break;
    case 'AppearanceMenuTarget':
      label = t`Appearance`;
      currentValue =
        colorMode === 'light'
          ? t`Light`
          : colorMode === 'dark'
            ? t`Dark`
            : t`Automatic`;
      target = AppearanceMenuTarget;
      break;
    case 'SystemInfoMenuTarget':
      label = t`Info`;
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
