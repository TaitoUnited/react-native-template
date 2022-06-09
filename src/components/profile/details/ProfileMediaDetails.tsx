import { t, Trans } from '@lingui/macro';

import {
  ProfileAttachmentPhotoItem,
  ProfileDetailSection,
} from './profileDetail';
import { AttachmentPurpose, LocalizedProfile } from '~graphql/generated';
import { Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileMediaDetails = ({ profile }: Props) => {
  const headShotSmile =
    profile.attachments.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotSmile,
    )[0] || undefined;

  const headShotNeutral =
    profile.attachments.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotNeutral,
    )[0] || undefined;

  const fullLengthShot =
    profile.attachments.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorFullLengthShot,
    )[0] || undefined;

  const otherPhotos = profile.attachments.data.filter(
    // TODO: Change this to be only photos after attachments can be other media as well
    (a) =>
      a.purpose !== AttachmentPurpose.ActorFullLengthShot &&
      a.purpose !== AttachmentPurpose.ActorHeadshotNeutral &&
      a.purpose !== AttachmentPurpose.ActorHeadshotSmile,
  );

  return (
    <ProfileDetailSection title={t`Media`}>
      <Text variant="title3">
        <Trans>Compulsory photos</Trans>
      </Text>

      <ProfileAttachmentPhotoItem
        title={t`Headshot (smile)`}
        photo={headShotSmile}
      />

      <ProfileAttachmentPhotoItem
        title={t`Headshot (neutral)`}
        photo={headShotNeutral}
      />
      <ProfileAttachmentPhotoItem
        title={t`Full length shot`}
        photo={fullLengthShot}
      />

      {otherPhotos.length > 0 && (
        <>
          <Text variant="title3">
            <Trans>Other photos</Trans>
          </Text>
          {otherPhotos.map((p) => (
            <ProfileAttachmentPhotoItem key={p.id} photo={p} />
          ))}
        </>
      )}
    </ProfileDetailSection>
  );
};

export default ProfileMediaDetails;
