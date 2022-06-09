import { t, Trans } from '@lingui/macro';
import { Modal, View } from 'react-native';
import { useState } from 'react';
import { OutlineButton } from '../../uikit/Buttons/OutlineButton';
import { ImageInput } from './ImageInput';
import FormTitle from './FormTitle';
import { Text, Stack, FillButton } from '~components/uikit';
import { styled } from '~styles';
import LoadingScreen from '~components/common/LoadingScreen';
import {
  AttachmentPurpose,
  PaginatedAttachments,
  useProfilePhotosListQuery,
} from '~graphql/generated';
import IconButton from '~components/uikit/Buttons/IconButton';
import { useTheme } from '~styles/styled';

type Props = {
  profileId: string;
  attachments: PaginatedAttachments;
};

export default function CastingImagesForm({ profileId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const [{ data, error, fetching }, refetch] = useProfilePhotosListQuery({
    variables: { input: { profileId } },
  });

  const attachments = data?.profilePhotos;

  const headShotSmile =
    attachments?.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotSmile,
    )[0] || undefined;

  const headShotNeutral =
    attachments?.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorHeadshotNeutral,
    )[0] || undefined;

  const fullLengthShot =
    attachments?.data.filter(
      (a) => a.purpose === AttachmentPurpose.ActorFullLengthShot,
    )[0] || undefined;

  if (fetching) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <FormTitle>
        <Trans>Now you can upload different casting images of yourself.</Trans>
      </FormTitle>
      <Stack axis="y" spacing="small">
        {error ? (
          <PhotosError onRetry={() => refetch()} />
        ) : (
          <>
            <Stack axis="x" spacing="small" style={{ flex: 1, height: 375 }}>
              <Stack axis="y" spacing="small" style={{ flex: 1 }}>
                <ImageInput
                  text={t`Face smile`}
                  icon="faceSmile"
                  profileId={profileId}
                  crop={{ width: 2000, height: 2500 }}
                  purpose={AttachmentPurpose.ActorHeadshotSmile}
                  photo={headShotSmile}
                />

                <ImageInput
                  text={t`Face neutral`}
                  icon="faceNeutral"
                  profileId={profileId}
                  crop={{ width: 2000, height: 2500 }}
                  purpose={AttachmentPurpose.ActorHeadshotNeutral}
                  photo={headShotNeutral}
                />
              </Stack>

              <ImageInput
                text={t`Full body`}
                icon="fullBody"
                profileId={profileId}
                crop={{ width: 2000, height: 3000 }}
                purpose={AttachmentPurpose.ActorFullLengthShot}
                photo={fullLengthShot}
              />
            </Stack>

            <Stack axis="x" spacing="small" justify="end">
              <OutlineButton
                variant="primary"
                size="small"
                onPress={() => setModalOpen(true)}
                icon="questionMarkFull"
              >
                <Trans>Help</Trans>
              </OutlineButton>
            </Stack>
          </>
        )}
      </Stack>
      <HelpModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </View>
  );
}

function PhotosError({ onRetry }: { onRetry: () => void }) {
  return (
    <PhotosErrorWrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="body">
          <Trans>Could not fetch photos</Trans>
        </Text>

        <FillButton variant="primary" onPress={onRetry}>
          <Trans>Retry</Trans>
        </FillButton>
      </Stack>
    </PhotosErrorWrapper>
  );
}

const PhotosErrorWrapper = styled('View', {
  padding: '$large',
  flexCenter: 'row',
});

type HelpModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

function HelpModal({ isOpen, closeModal }: HelpModalProps) {
  const theme = useTheme();
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <SafeArea>
        <Stack
          axis="y"
          spacing="normal"
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: theme.space.normal,
          }}
        >
          <Stack axis="x" spacing="normal" justify="end">
            <IconButton onPress={closeModal} size="medium" icon="x" />
          </Stack>
          <Text variant="bodySmall" color={'text'}>
            <Trans>Placeholder Text</Trans>
          </Text>
        </Stack>
      </SafeArea>
    </Modal>
  );
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  padding: '$large',
  flexCenter: 'column',
  backgroundColor: 'rgba(255,255,255,0.95)',
});
