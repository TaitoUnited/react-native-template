import { t, Trans } from '@lingui/macro';

import { useDeleteProfile } from './hooks';
import ProfileBasicInfoDetails from './ProfileBasicInfoDetails';
import ProfileAppearanceDetails from './ProfileAppearanceDetails';
import ProfileLanguageDetails from './ProfileLanguageDetails';
import ProfileEducationDetails from './ProfileEducationDetails';
import ProfileActingSkillDetails from './ProfileActingSkillDetails';
import ProfileMediaDetails from './ProfileMediaDetails';
import ProfilePortfolioDetails from './ProfilePortfolioDetails';
import ProfileCoursesDetails from './ProfileCoursesDetails';
import { styled } from '~styles';
import { Text, Stack, OutlineButton } from '~components/uikit';
import { AttachmentPurpose, LocalizedProfile } from '~graphql/generated';
import { parsePhotoUrl } from '~utils/file';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

export default function ProfileDetails({ profile }: Props) {
  const [deleteProfileResult, deleteProfile] = useDeleteProfile();

  // Only show name if first name is defined since we don't want to show the last name alone
  const name = profile.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : t`Missing name`;

  const headShotSmile =
    profile.attachments.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotSmile,
    )[0] || undefined;

  const headShotNeutral =
    profile.attachments.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotNeutral,
    )[0] || undefined;

  // First use the headshot with a smile. If this is not defined then use the neutral headshot.
  const photoUrl = headShotSmile?.fileUrl
    ? parsePhotoUrl(headShotSmile.fileUrl, 'medium')
    : headShotNeutral?.fileUrl
    ? parsePhotoUrl(headShotNeutral.fileUrl, 'medium')
    : undefined;

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="x" spacing="normal" align="center">
          <Photo>
            {photoUrl && <ProfileMainImage source={{ uri: photoUrl }} />}
          </Photo>
          <Text variant="title2">{name}</Text>
        </Stack>

        {/* 
        Disabled for soft launch. App store does not accept useless buttons. 
        TODO: Enable this when we have the implementation. 

        <Stack axis="y" spacing="normal">
          <ScreenLink>
            <Text variant="bodySmallBold">
              <Trans>My applications</Trans>
            </Text>

            <Icon name="chevronRight" size={24} color="primary" />
          </ScreenLink>

          <ScreenLink>
            <Text variant="bodySmallBold">
              <Trans>History</Trans>
            </Text>
            <Icon name="chevronRight" size={24} color="primary" />
          </ScreenLink>
        </Stack> */}

        <ProfileBasicInfoDetails profile={profile} />

        <ProfileAppearanceDetails profile={profile} />

        <ProfileLanguageDetails profile={profile} />

        <ProfileEducationDetails profile={profile} />

        <ProfileCoursesDetails profile={profile} />

        <ProfileActingSkillDetails profile={profile} />

        <ProfileMediaDetails profile={profile} />

        <ProfilePortfolioDetails profile={profile} />

        <OutlineButton
          variant="danger"
          size="medium"
          onPress={() => deleteProfile(profile.id)}
          loading={deleteProfileResult.fetching}
        >
          <Trans>Delete profile</Trans>
        </OutlineButton>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const Photo = styled('View', {
  width: 128,
  height: 128,
  borderRadius: '$large',
  backgroundColor: '$muted5',
});

const ProfileMainImage = styled('Image', {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  overflow: 'hidden',
  borderRadius: '$medium',
});

// NOTE: Relates to the commented ScreenLinks in the above component.
// const ScreenLink = styled('TouchableOpacity', {
//   padding: '$normal',
//   borderRadius: '$normal',
//   borderWidth: 1,
//   borderColor: '$primary',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// });
