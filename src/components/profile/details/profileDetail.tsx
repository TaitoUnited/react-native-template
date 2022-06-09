import { t, Trans } from '@lingui/macro';

import { format, parseISO } from 'date-fns';
import { ReactNode } from 'react';
import { styled } from '~styles';
import { Text, Stack, ScaledImage } from '~components/uikit';
import {
  Attachment,
  ProfileEducation,
  ProfileLanguage,
} from '~graphql/generated';
import { parsePhotoUrl } from '~utils/file';

export const ProfileContentItem = ({
  title,
  content,
}: {
  title: string;
  content?: string;
}) => {
  return (
    <Stack axis="y" spacing="xxsmall">
      <Text variant="bodyExtraSmall" color={'textMuted'}>
        {title}
      </Text>
      <Text variant="body">{content || t`Not filled`}</Text>
    </Stack>
  );
};

export const ProfileAttachmentPhotoItem = ({
  title,
  photo,
}: {
  title?: string;
  photo?: Attachment;
}) => {
  return (
    <Stack axis="y" spacing="xxsmall">
      <Text variant="bodyExtraSmall" color={'textMuted'}>
        {title || photo?.title || t`Untitled`}
      </Text>
      {photo?.fileUrl ? (
        <Stack axis="x" spacing="none">
          <ProfileAttachmentImage
            source={{
              uri: parsePhotoUrl(photo.fileUrl, 'large'),
            }}
            size={{ height: 200 }}
          />
        </Stack>
      ) : (
        <Text variant="body">
          <Trans>No photo added</Trans>
        </Text>
      )}
    </Stack>
  );
};

export const ProfileLanguageItem = ({
  language,
}: {
  language: ProfileLanguage;
}) => {
  return (
    <Stack axis="y" spacing="xxsmall">
      <Stack axis="x" spacing="xsmall" style={{ alignItems: 'baseline' }}>
        <Text variant="bodyBold">{language?.name}</Text>

        <Text variant="body">|</Text>

        <Text variant="body">
          <Trans>Level</Trans> {language?.level}
        </Text>
      </Stack>

      {language?.description && (
        <Text variant="bodySmall" color={'textMuted'}>
          {language?.description}
        </Text>
      )}
    </Stack>
  );
};

export const ProfileEducationItem = ({
  education,
}: {
  education: ProfileEducation;
}) => {
  return (
    <Stack axis="y" spacing="xxsmall">
      <Stack axis="x" spacing="xsmall" style={{ alignItems: 'baseline' }}>
        <Text variant="bodyBold">{education?.schoolName}</Text>

        <Text variant="body">|</Text>

        <Text variant="body">
          {format(parseISO(education?.startDate), 'yyyy')} -{' '}
          {education?.endDate
            ? format(parseISO(education?.endDate), 'yyyy')
            : t`Present`}
        </Text>
      </Stack>

      {education?.description && (
        <Text variant="bodySmall" color={'textMuted'}>
          {education?.description}
        </Text>
      )}
    </Stack>
  );
};

export const ProfileDetailSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Stack axis="y" spacing="small">
      <Text variant="title2">{title}</Text>
      {children}
    </Stack>
  );
};

const ProfileAttachmentImage = styled(ScaledImage, {
  resizeMode: 'contain',
  borderRadius: '$small',
});
