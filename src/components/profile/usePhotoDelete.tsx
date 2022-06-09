import { useCallback } from 'react';
import { t } from '@lingui/macro';
import {
  Attachment,
  useDeleteProfilePhotoAttachmentMutation,
} from '~graphql/generated';
import { showToast } from '~components/common/Toaster';

type AttachmentWithoutTypeName = Omit<Attachment, '__typename'>;

/**
 * A hook that can handle the 2 step process of deleting a photo.
 * It stores data about the process and executes the deletion.
 * 1.) open modal, user confirms the delete
 * 2.) delete the photo
 * @returns [
    setMarkedForDeletePhoto, // set the photo that will be deleted
    markedForDeletePhoto, // stores the photo that will be deleted
    deletePhoto // delete the stored photo if it is not null
  ]
 */
export default function usePhotoDelete(profileId: string) {
  const [, deleteProfilePhoto] = useDeleteProfilePhotoAttachmentMutation();

  // Call to delete the attachment stored in deleteAttachmentId
  const deletePhoto = useCallback(
    (photo: Attachment) =>
      new Promise<Partial<AttachmentWithoutTypeName>>((resolve, reject) => {
        if (!photo?.id) {
          showToast({
            title: t`Deletion failed!`,
            subtitle: t`Cannot load attachment.`,
            type: 'error',
          });
          return;
        }

        // call query
        deleteProfilePhoto({
          input: {
            id: photo.id,
            profileId: profileId,
          },
        })
          .then(() => {
            showToast({
              title: t`Deletion successful!`,
              subtitle: t`Deleted ` + photo.filename,
              type: 'success',
            });
            resolve(photo);
          })
          .catch((error) => {
            showToast({
              title: t`Deletion failed!`,
              subtitle: t`Connection problem`,
              type: 'error',
            });
            reject(error);
          });
      }),
    [profileId, deleteProfilePhoto],
  );

  return deletePhoto;
}
