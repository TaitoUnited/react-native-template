import { Alert } from 'react-native';
import { t, Trans } from '@lingui/macro';

import { OutlineButton } from '~components/uikit';
import { useAuthStore } from '~services/auth';

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    Alert.alert(t`Are you sure you want to logout?`, '', [
      { text: t`Cancel`, style: 'cancel' },
      { text: t`Logout`, onPress: () => logout() },
    ]);
  }

  return (
    <OutlineButton variant="primary" icon="logout" onPress={handleLogout}>
      <Trans>Logout</Trans>
    </OutlineButton>
  );
}
