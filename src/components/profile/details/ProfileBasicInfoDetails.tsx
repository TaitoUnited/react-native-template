import { t, Trans } from '@lingui/macro';

import { format, parseISO } from 'date-fns';
import { ProfileContentItem, ProfileDetailSection } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';
import { Icon, Stack, Text } from '~components/uikit';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileBasicInfoDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Basic info`}>
      <ProfileContentItem
        title={t`Email`}
        content={profile.email || undefined}
      />

      <ProfileContentItem
        title={t`Phone number`}
        content={profile.phoneNumber || undefined}
      />

      <ProfileContentItem
        title={t`Date of Birth`}
        content={
          profile.dateOfBirth
            ? format(parseISO(profile.dateOfBirth), 'dd.MM.yyyy')
            : undefined
        }
      />

      <ProfileContentItem
        title={t`Residence country`}
        content={profile.residenceCountry?.name}
      />

      <ProfileContentItem
        title={t`Residence municipality`}
        content={profile.municipality?.name}
      />

      <ProfileContentItem
        title={t`Municipalities of interest`}
        content={profile.municipalitiesOfInterest
          ?.map((m) => m.name)
          .join(', ')}
      />

      <ProfileContentItem
        title={t`Role types of interest`}
        content={profile.preferredRoleTypes?.map((r) => r.label).join(', ')}
      />

      <ProfileContentItem
        title={t`Project types of interest`}
        content={profile.preferredProjectTypes?.map((p) => p.label).join(', ')}
      />

      <Stack axis="y" spacing="xxsmall">
        <Text variant="bodyExtraSmall" color={'textMuted'}>
          <Trans>Member of actor union</Trans>
        </Text>
        <Icon
          name={profile.memberOfActorUnion ? 'checkmark' : 'x'}
          color={profile.memberOfActorUnion ? 'success' : 'error'}
        />
      </Stack>
    </ProfileDetailSection>
  );
};

export default ProfileBasicInfoDetails;
