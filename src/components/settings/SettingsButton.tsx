import { Trans } from '@lingui/macro';
import { useNavigation } from '../../screens/utils';
import { OutlineButton } from '~components/uikit';

export default function SettingsButton() {
  const navigation = useNavigation();
  const openSettings = () => navigation.navigate('Settings');

  return (
    <OutlineButton variant="primary" size="medium" onPress={openSettings}>
      <Trans>Settings</Trans>
    </OutlineButton>
  );
}
