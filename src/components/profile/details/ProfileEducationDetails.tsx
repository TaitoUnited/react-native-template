import { t, Trans } from '@lingui/macro';

import { ProfileDetailSection, ProfileEducationItem } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';
import { Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileEducationDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Educations`}>
      {profile.educations.length > 0 ? (
        profile.educations.map((e) => {
          return e && <ProfileEducationItem key={e.id} education={e} />;
        })
      ) : (
        <Text variant="body">
          <Trans>No educations filled</Trans>
        </Text>
      )}
    </ProfileDetailSection>
  );
};

export default ProfileEducationDetails;
