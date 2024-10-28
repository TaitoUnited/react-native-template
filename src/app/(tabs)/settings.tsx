import { msg } from '@lingui/macro';

import MenuList from '~components/common/MenuList';
import { useHeaderPlaygroundButton } from '~components/playground/utils';
import { useMenuListItem } from '~components/settings/hooks';
import { Icon, alert } from '~components/uikit';
import { useAuthStore } from '~services/auth';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';
import { announceForAccessibility } from '~utils/a11y';
import { haptics } from '~utils/haptics';

export default function Settings() {
  useHeaderPlaygroundButton();

  const { _ } = useI18n();
  const logout = useAuthStore((s) => s.logout);

  function onLogout() {
    logout();
    haptics.notificationSuccess();
    announceForAccessibility({
      message: _(msg`Logged out successfully, back to the landing page`),
    });
  }

  function handleLogout() {
    haptics.notificationWarning();
    alert(_(msg`Are you sure you want to logout?`), '', [
      { text: _(msg`Cancel`), style: 'cancel', onPress: () => {} },
      { text: _(msg`I am sure`), onPress: onLogout },
    ]);
  }

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

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));
