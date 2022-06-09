import { t, Trans } from '@lingui/macro';

import { ProfileDetailSection } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';
import { Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileCoursesDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Courses`}>
      {profile?.coursesDescriptions?.length ? (
        profile.coursesDescriptions.map((c, i) => {
          return (
            c && (
              <Text variant="body" key={i}>
                {c}
              </Text>
            )
          );
        })
      ) : (
        <Text variant="body">
          <Trans>No courses filled</Trans>
        </Text>
      )}
    </ProfileDetailSection>
  );
};

export default ProfileCoursesDetails;
