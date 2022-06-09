import { t, Trans } from '@lingui/macro';

import { styled } from '~styles';
import { AttachmentPurpose, LocalizedProfile } from '~graphql/generated';
import { Text, Stack, Icon, Spacer, ScaledImage } from '~components/uikit';
import { useNavigation } from '~screens/utils';
import { parsePhotoUrl } from '~utils/file';

type Props = {
  profiles: Array<Omit<LocalizedProfile, 'user'>>;
};

export default function ProfileList({ profiles }: Props) {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="title2">
          <Trans>Your profiles</Trans>
        </Text>

        <Stack axis="y" spacing="small">
          {profiles.map((profile) => {
            const { attachments } = profile;

            const headShotSmile =
              attachments.data.filter(
                (a) => a.purpose === AttachmentPurpose.ActorHeadshotSmile,
              )[0] || undefined;

            const headShotNeutral =
              attachments.data.filter(
                (a) => a.purpose === AttachmentPurpose.ActorHeadshotNeutral,
              )[0] || undefined;

            // First use the headshot with a smile. If this is not defined then use the neutral headshot.
            const photoUrl = headShotSmile?.fileUrl
              ? parsePhotoUrl(headShotSmile.fileUrl, 'medium')
              : headShotNeutral?.fileUrl
              ? parsePhotoUrl(headShotNeutral.fileUrl, 'medium')
              : undefined;

            // Only show name if first name is defined since we don't want to show the last name alone
            const name = profile.firstName
              ? `${profile.firstName} ${profile.lastName || ''}`.trim()
              : t`Missing name`;

            return (
              <Card
                key={profile.id}
                onPress={() =>
                  navigation.navigate('ProfileDetails', { profile })
                }
              >
                <Avatar
                  source={{ uri: photoUrl }}
                  size={{ width: 56, height: 56 }}
                />

                <Spacer axis="x" size="small" />

                <Text variant="title3" style={{ flex: 1 }} numberOfLines={1}>
                  {name}
                </Text>

                <Spacer axis="x" size="xsmall" />

                <Icon name="chevronRight" size={24} color="primary" />
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const Card = styled('TouchableOpacity', {
  padding: '$normal',
  borderRadius: '$normal',
  borderWidth: 1,
  borderColor: '$primary',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Avatar = styled(ScaledImage, {
  borderRadius: '$full',
  backgroundColor: '$muted5',
});
