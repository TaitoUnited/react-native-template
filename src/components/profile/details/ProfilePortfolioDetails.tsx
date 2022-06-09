import { t, Trans } from '@lingui/macro';

import { ProfileContentItem, ProfileDetailSection } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';
import { Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfilePortfolioDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Portfolio`}>
      {profile.urls.length > 0 ? (
        profile.urls.map((u) => (
          <ProfileContentItem
            title={u.name}
            content={u.url}
            key={u.name + u.url}
          />
        ))
      ) : (
        <Text variant="body">
          <Trans>No portfolio links</Trans>
        </Text>
      )}
    </ProfileDetailSection>
  );
};

export default ProfilePortfolioDetails;
