import { useLingui } from '@lingui/react/macro';
import { Alert, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import MenuList from '~components/common/MenuList';
import { useHeaderPlaygroundButton } from '~components/playground/utils';
import { useMenuListItem } from '~components/settings/hooks';
import { Icon } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { announceForAccessibility } from '~utils/a11y';
import { haptics } from '~utils/haptics';

export default function Settings() {
  useHeaderPlaygroundButton();

  const { t } = useLingui();
  const logout = useAuthStore((s) => s.logout);

  function onLogout() {
    logout();
    haptics.notificationSuccess();
    announceForAccessibility({
      message: t`Logged out successfully, back to the landing page`,
    });
  }

  function handleLogout() {
    haptics.notificationWarning();
    Alert.alert(t`Are you sure you want to logout?`, '', [
      { text: t`Cancel`, style: 'cancel', onPress: () => {} },
      { text: t`I am sure`, onPress: onLogout },
    ]);
  }

  const items = [
    useMenuListItem({ targetName: 'LanguageMenuTarget' }),
    // useMenuListItem({ targetName: 'AppearanceMenuTarget' }), // We currently do not support dark mode, so until we do, we should not show this option
    useMenuListItem({ targetName: 'SystemInfoMenuTarget' }),
    {
      id: 'logout',
      targetName: 'LogoutButton',
      label: t`Logout`,
      rightSlot: <Icon name="logout" color="textMuted" size={18} />,
      onPress: handleLogout,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      testID="settingsScreen"
    >
      <MenuList items={items} />
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
}));
