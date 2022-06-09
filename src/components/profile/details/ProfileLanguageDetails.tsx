import { t, Trans } from '@lingui/macro';

import { ProfileDetailSection, ProfileLanguageItem } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';
import { Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileLanguageDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Languages`}>
      {profile.educations.length ? (
        profile.languages.map((l) => {
          return l && <ProfileLanguageItem key={l.id} language={l} />;
        })
      ) : (
        <Text variant="body">
          <Trans>No languages filled</Trans>
        </Text>
      )}
    </ProfileDetailSection>
  );
};

export default ProfileLanguageDetails;
