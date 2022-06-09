import { useState } from 'react';
import { t } from '@lingui/macro';
import { ActivityIndicator, Alert } from 'react-native';

import usePhotoDelete from '../usePhotoDelete';
import usePhotoUpload from '../usePhotoUpload';
import { Icon, Stack, Text } from '~components/uikit';
import { IconName } from '~components/uikit/Icon';
import { Attachment, AttachmentPurpose } from '~graphql/generated';
import { styled } from '~styles';
import { parsePhotoUrl, ReactNativeFile, useImagePicker } from '~utils/file';

type ImageInputProps = {
  icon: IconName;
  text: string;
  profileId: string;
  crop?: {
    width: number;
    height: number;
  };
  purpose?: AttachmentPurpose;
  photo?: Attachment;
};

export function ImageInput({
  icon,
  text,
  profileId,
  crop = { width: 2000, height: 2000 },
  purpose,
  photo,
}: ImageInputProps) {
  const [loading, setLoading] = useState(false);

  const uploadPhoto = usePhotoUpload({ profileId, purpose });

  const deletePhoto = usePhotoDelete(profileId);

  const onDone = (image: ReactNativeFile) => {
    setLoading(true);
    uploadPhoto([image]).finally(() => setLoading(false));
  };

  const onError = (error: any) => console.log('IMAGE ERROR', error);

  function handleDelete() {
    if (!photo) {
      if (!image) {
        // TODO: ERROR handling
        return;
      }
      clearImage();
      return;
    }

    Alert.alert(
      t`Are you sure you want to delete` + ' ' + photo.filename + `?`,
      '',
      [
        { text: t`Cancel`, style: 'cancel' },
        {
          text: t`Delete`,
          style: 'destructive',
          onPress: () => {
            clearImage();
            deletePhoto(photo);
          },
        },
      ],
    );
  }

  const { image, pickImage, clearImage } = useImagePicker({
    onDone: onDone,
    onError: onError,
    width: crop.width,
    height: crop.height,
  });

  const backgroundImageUrl = !photo?.fileUrl
    ? image?.uri
    : parsePhotoUrl(photo?.fileUrl, 'large');

  return (
    <Container>
      {backgroundImageUrl ? (
        <>
          <StyledImage source={{ uri: backgroundImageUrl }} loading={loading} />
          <RemoveButton onPress={() => handleDelete()} disabled={loading}>
            <Icon name="x" color="text" size={14} />
          </RemoveButton>
        </>
      ) : (
        <Wrapper onPress={pickImage} loading={loading}>
          <Stack axis="y" spacing="xxsmall" align="center">
            <Icon name={icon} color={'text'} size={36} />
            <Text variant="bodySmall" color={'text'}>
              {text}
            </Text>
          </Stack>
        </Wrapper>
      )}
      {loading && <Spinner size="large" />}
    </Container>
  );
}

const Container = styled('View', {
  borderRadius: '$medium',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Wrapper = styled('TouchableOpacity', {
  borderRadius: '$medium',
  display: 'flex',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$muted4',
  variants: {
    loading: {
      true: {
        opacity: 0.2,
      },
      false: {
        opacity: 1,
      },
    },
  },
});

const Spinner = styled(ActivityIndicator, {
  position: 'absolute',
});

const StyledImage = styled('Image', {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  overflow: 'hidden',
  borderRadius: '$medium',
  variants: {
    loading: {
      true: {
        opacity: 0.2,
      },
      false: {
        opacity: 1,
      },
    },
  },
});

const RemoveButton = styled('TouchableHighlight', {
  position: 'absolute',
  right: -6,
  top: -6,
  width: 24,
  height: 24,
  flexCenter: 'row',
  shadow: 'small',
  borderRadius: '$full',
  borderWidth: 1,
  borderColor: '$primary',
  backgroundColor: '$background',
  zIndex: 100,
}).attrs((p) => ({
  underlayColor: p.theme.colors.muted5,
  hitSlop: { top: 6, right: 6, bottom: 6, left: 6 },
}));
