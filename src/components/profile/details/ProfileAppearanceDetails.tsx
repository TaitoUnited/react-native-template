import { t } from '@lingui/macro';

import { ProfileContentItem, ProfileDetailSection } from './profileDetail';
import { LocalizedProfile } from '~graphql/generated';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const ProfileAppearanceDetails = ({ profile }: Props) => {
  return (
    <ProfileDetailSection title={t`Appearance`}>
      <ProfileContentItem title={t`Gender`} content={profile.gender?.label} />

      <ProfileContentItem
        title={t`Acting genders`}
        content={profile.actingGenders?.map((g) => g.label).join(', ')}
      />

      <ProfileContentItem
        title={t`Skin color`}
        content={profile.skinColor?.label}
      />

      <ProfileContentItem
        title={t`Ethnicity`}
        content={profile.ethnicity?.map((e) => e.name).join(', ')}
      />

      <ProfileContentItem
        title={t`Hair color`}
        content={profile.hairColor?.label}
      />

      <ProfileContentItem
        title={t`Hair color description`}
        content={profile.hairDescription || undefined}
      />

      <ProfileContentItem
        title={t`Hair dyed`}
        content={profile.hairDyed ? t`Yes` : t`No`}
      />

      <ProfileContentItem
        title={t`Hair style`}
        content={profile.hairStyle?.map((s) => s.label).join(', ')}
      />

      <ProfileContentItem
        title={t`Body build`}
        content={profile.builds?.map((b) => b.label).join(', ')}
      />

      <ProfileContentItem
        title={t`Unique attributes`}
        content={profile.attributes?.map((a) => a.label).join(', ')}
      />

      <ProfileContentItem
        title={t`Attributes description`}
        content={profile.attributesDescription || undefined}
      />

      {!profile.childrenSizeCm && (
        <>
          <ProfileContentItem
            title={t`Clothing size (upper body)`}
            content={profile.clothingSizeUpperBody || undefined}
          />

          <ProfileContentItem
            title={t`Clothing size (lower body)`}
            content={profile.clothingSizeLowerBody || undefined}
          />
        </>
      )}

      {profile.childrenSizeCm && (
        <ProfileContentItem
          title={t`Children size (cm)`}
          content={profile.childrenSizeCm.toString()}
        />
      )}

      <ProfileContentItem
        title={t`Height (cm)`}
        content={profile.heightCm?.toString() || undefined}
      />

      <ProfileContentItem
        title={t`Shoe size (eu)`}
        content={profile.shoeSizeEu?.toString() || undefined}
      />
    </ProfileDetailSection>
  );
};

export default ProfileAppearanceDetails;
