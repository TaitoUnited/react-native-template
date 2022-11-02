import { Trans } from '@lingui/macro';
import { Image } from 'react-native';
import LogoutButton from '~components/auth/LogoutButton';
import ColorModeButton from '~components/common/ColorModeButton';
import { FillButton, Stack, Text } from '~components/uikit';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';

export default function SettingsScreen() {
  const { toggleLocale, locale } = useI18n();

  return (
    <Wrapper>
      <Stack axis="y" spacing="large" align="center" justify="around">
        <AvatarPicture />
        <FillButton onPress={toggleLocale}>{locale}</FillButton>

        <ColorModeButton />

        <LogoutButton />
      </Stack>
    </Wrapper>
  );
}

function AvatarPicture() {
  const hasPic = true;
  return (
    <Stack axis="y" spacing="normal" align="center">
      <Text variant="overline">avatar pic</Text>
      <PictureWrapper axis="x" spacing="none" justify="center" align="center">
        {hasPic ? (
          <UserPicture source={require('~design-system/assets/icon.png')} />
        ) : (
          <Text style={{ textAlign: 'center' }} variant="body">
            <Trans>Add your avatar</Trans>
          </Text>
        )}
      </PictureWrapper>
    </Stack>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

const PictureWrapper = styled(Stack, {
  width: 100,
  height: 100,
  borderRadius: '$full',
  backgroundColor: '$pressHighlight',
  boxShadow: 'inset 0 0 0 1px hsla(0, 0%, 0%, 0.1)',
});

const UserPicture = styled(Image, {
  width: 100,
  height: 100,
  borderRadius: '$full',
  resizeMode: 'stretch',
});
