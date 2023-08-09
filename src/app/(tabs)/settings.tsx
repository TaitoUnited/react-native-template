import { ComponentProps, FunctionComponent } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { t } from '@lingui/macro';
import { getReadableVersion } from 'react-native-device-info';
import capitalize from 'lodash/capitalize';
import { updateId as expoUpdateId } from 'expo-updates';
import { setStringAsync } from 'expo-clipboard';

import { styled } from '~styles';
import { Icon, Text } from '~components/uikit';
import { useI18n } from '~services/i18n';
import { useColorMode } from '~services/color-mode';
import MenuList from '~components/common/MenuList';
import config from '~constants/config';
import { useHeaderPlaygroundButton } from '~app/playground/utils';
import { useAuthStore } from '~services/auth';
import { showToast } from '~components/common/Toaster';

export default function Settings() {
  const logout = useAuthStore((s) => s.logout);
  function handleLogout() {
    Alert.alert(t`Are you sure you want to logout?`, '', [
      { text: t`Cancel`, style: 'cancel' },
      { text: t`Logout`, onPress: () => logout() },
    ]);
  }

  useHeaderPlaygroundButton();

  const items = [
    useMenuListItem('LanguageMenuTarget'),
    useMenuListItem('AppearanceMenuTarget'),
    useMenuListItem('SystemInfoMenuTarget'),
    {
      label: t`Logout`,
      rightSlot: <Icon name="logout" color="textMuted" size={18} />,
      onPress: handleLogout,
    },
  ];

  return (
    <Wrapper>
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
          label: t`English`,
          checked: locale === 'en',
          onPress: () => setLocale('en'),
        },
        {
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
          label: t`Automatic`,
          checked: colorMode === 'system',
          onPress: () => setColorMode('system'),
        },
        {
          label: t`Dark`,
          checked: colorMode === 'dark',
          onPress: () => setColorMode('dark'),
        },
        {
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
      label: t`Version`,
      currentValue: getReadableVersion(),
    },
    {
      label: t`Environment`,
      currentValue: capitalize(config.appEnv),
    },
  ];

  const updateId = expoUpdateId;

  if (updateId) {
    items.push({
      label: t`Update ID`,
      currentValue: (
        <TouchableOpacity
          onLongPress={async () => {
            await setStringAsync(updateId);
            showToast({
              title: t`Copied to clipboard`,
              type: 'success',
              icon: 'checkmark',
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
    padding: p.theme.space.normal,
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
    label,
    currentValue,
    target,
    targetName,
  };
}
