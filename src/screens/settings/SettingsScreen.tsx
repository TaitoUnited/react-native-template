import { styled } from '~styles';
import { FillButton, Stack } from '~components/uikit';
import { useI18n } from '~services/i18n';
import LogoutButton from '~components/auth/LogoutButton';
import ColorModeButton from '~components/common/ColorModeButton';
import { ScreenProps } from '~screens/types';

export default function SettingsScreen(_: ScreenProps<'Settings'>) {
  const { toggleLocale, locale } = useI18n();

  return (
    <Wrapper>
      <Stack axis="y" spacing="large" align="center" justify="around">
        <FillButton onPress={toggleLocale}>{locale}</FillButton>
        <ColorModeButton />
        <LogoutButton />
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});
