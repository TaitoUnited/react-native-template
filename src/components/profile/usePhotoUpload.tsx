import { t } from '@lingui/macro';
import RNFetchBlob from 'rn-fetch-blob';

import {
  AttachmentPurpose,
  useCreateProfilePhotoAttachmentMutation,
  useFinalizeProfilePhotoAttachmentMutation,
} from '../../graphql/generated';
import { ReactNativeFile } from '~utils/file';
import { showToast } from '~components/common/Toaster';

export default function usePhotoUpload({
  profileId,
  fileSuccessfulUpload,
  purpose,
}: {
  profileId: string;
  fileSuccessfulUpload?: (id: string, file: ReactNativeFile) => void;
  purpose?: AttachmentPurpose;
}) {
  const [, createProfilePhoto] = useCreateProfilePhotoAttachmentMutation();

  const [, finalizeProfilePhoto] = useFinalizeProfilePhotoAttachmentMutation();

  const uploadPhoto = async (files: ReactNativeFile[]) => {
    for (const file of files) {
      try {
        const createResult = await createProfilePhoto({
          input: {
            profileId: profileId,
            contentType: file.type,
            filename: file.name,
            purpose: purpose,
          },
        });

        if (
          createResult.error ||
          !createResult.data?.createProfilePhotoAttachment
        ) {
          throw new Error(
            "Couldn't get upload info: " + createResult.error?.message ||
              'No data',
          );
        }

        const uploadInfo = createResult.data.createProfilePhotoAttachment;

        // map received headers to fetch headers
        const headers: Record<string, string> = {};
        uploadInfo.headers.forEach(
          (h: { key: string | number; value: string }) => {
            headers[h.key] = h.value;
          },
        );

        try {
          const fetchResult = await RNFetchBlob.fetch(
            'PUT',
            uploadInfo.url,
            headers,
            RNFetchBlob.wrap(file.uri),
          );

          if (!fetchResult) {
            throw new Error('Fetch result not defined');
          }

          try {
            const finalizeResult = await finalizeProfilePhoto({
              input: { id: uploadInfo.id, profileId: profileId },
            });

            if (!finalizeResult || finalizeResult.error) {
              throw new Error(
                'Problem with finalizing the photo: ' +
                  finalizeResult.error?.message || 'Result undefined',
              );
            }

            showToast({
              title: t`File successfully uploaded!`,
              subtitle: t`File: ` + ' ' + file.name + '.',
              type: 'success',
            });

            fileSuccessfulUpload?.(uploadInfo.id, file);
          } catch (error) {
            console.log('> Could not finalize file', error);
            showToast({
              title:
                t`Uploading attachment failed! ` + t`Finalizing upload failed!`,
              subtitle: t`Please try again`,
              type: 'error',
            });
          }
        } catch (error) {
          console.log('> Could not upload file to received URL', error);
          showToast({
            title:
              t`Uploading attachment failed! ` +
              t`Couldn't upload attachment to the server failed.`,
            subtitle: t`Please try again`,
            type: 'error',
          });
        }
      } catch (error) {
        console.log('> Failed to get upload URL', error);
        showToast({
          title: t`Uploading attachment failed! ` + t`Cannot get upload URL.`,
          subtitle: t`Please try again`,
          type: 'error',
        });
      }
    }
  };

  return uploadPhoto;
}
