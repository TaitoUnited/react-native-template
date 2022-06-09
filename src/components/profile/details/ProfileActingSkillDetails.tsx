import { t } from '@lingui/macro';

import { ProfileContentItem, ProfileDetailSection } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileActingSkillDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Acting skills`}>
      <ProfileContentItem
        title={t`Actor type`}
        content={profile.actorType?.label}
      />

      <ProfileContentItem
        title={t`Occupation`}
        content={profile.occupation || undefined}
      />

      <ProfileContentItem
        title={t`Acting experience (years)`}
        content={profile.experienceYears?.toString() || undefined}
      />

      <ProfileContentItem
        title={t`Unique skills`}
        content={profile.skills || undefined}
      />

      <ProfileContentItem
        title={t`Worked on`}
        content={profile.workingDescription || undefined}
      />

      <ProfileContentItem
        title={t`Known for`}
        content={profile.knownForDescription || undefined}
      />
    </ProfileDetailSection>
  );
};

export default ProfileActingSkillDetails;
