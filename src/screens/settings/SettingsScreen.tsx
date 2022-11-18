import { Alert } from 'react-native';
import { t } from '@lingui/macro';
import { getReadableVersion } from 'react-native-device-info';
import capitalize from 'lodash/capitalize';

import { styled } from '~styles';
import { Icon } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { useI18n } from '~services/i18n';
import { useColorMode } from '~services/color-mode';
import { useAuthStore } from '~services/auth';
import { useHeaderPlaygroundButton } from '~screens/playground/utils';
import MenuList from '~components/common/MenuList';
import config from '~constants/config';

export default function SettingsScreen(_: ScreenProps<'Settings'>) {
  const { locale } = useI18n();
  const { colorScheme } = useColorMode();
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    Alert.alert(t`Are you sure you want to logout?`, '', [
      { text: t`Cancel`, style: 'cancel' },
      { text: t`Logout`, onPress: () => logout() },
    ]);
  }

  useHeaderPlaygroundButton();

  return (
    <Wrapper>
      <MenuList
        items={[
          {
            label: t`Language`,
            currentValue: locale === 'en' ? 'English' : 'Suomi',
            target: LanguageMenuTarget,
          },
          {
            label: t`Appearance`,
            currentValue: colorScheme === 'light' ? t`Light` : t`Dark`,
            target: AppearanceMenuTarget,
          },
          {
            label: t`Info`,
            target: SystemInfoMenuTarget,
          },
          {
            label: t`Logout`,
            rightSlot: <Icon name="logout" color="textMuted" size={18} />,
            onPress: handleLogout,
          },
        ]}
      />
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
  return (
    <MenuList
      items={[
        {
          label: t`Version`,
          currentValue: getReadableVersion(),
        },
        {
          label: t`Environment`,
          currentValue: capitalize(config.appEnv),
        },
      ]}
    />
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));
