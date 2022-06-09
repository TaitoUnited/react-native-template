import { Variables, Cache } from '@urql/exchange-graphcache';

import { PROFILE_PHOTOS_QUERY } from '../profile/queries.gql';
import {
  CreateProfileMutation,
  DeleteProfileMutation,
  DeleteProfilePhotoAttachmentMutation,
  DeleteProfilePhotoAttachmentMutationVariables,
  FinalizeProfilePhotoAttachmentMutation,
  FinalizeProfilePhotoAttachmentMutationVariables,
  ProfileListQuery,
  ProfilePhotosListQuery,
} from '~graphql/generated';

import { PROFILE_LIST_QUERY } from '~graphql/profile/queries.gql';

export function createProfile(
  result: CreateProfileMutation,
  _args: Variables,
  cache: Cache,
) {
  cache.updateQuery<ProfileListQuery>({ query: PROFILE_LIST_QUERY }, (data) => {
    data?.currentUser.profiles.data.push(result.createProfile);
    return data;
  });
}

export function deleteProfile(
  result: DeleteProfileMutation,
  _args: Variables,
  cache: Cache,
) {
  cache.updateQuery<ProfileListQuery>({ query: PROFILE_LIST_QUERY }, (data) => {
    if (!data) return data;

    const profiles = (data?.currentUser.profiles.data ?? []).filter(
      (profile) => profile.id !== result.deleteProfile,
    );

    data.currentUser.profiles.data = profiles;

    return data;
  });
}

export function finalizeProfilePhotoAttachment(
  result: FinalizeProfilePhotoAttachmentMutation,
  args: FinalizeProfilePhotoAttachmentMutationVariables,
  cache: Cache,
) {
  cache.updateQuery<ProfilePhotosListQuery>(
    {
      query: PROFILE_PHOTOS_QUERY,
      variables: {
        input: { profileId: args.input.profileId },
      },
    },
    (data) => {
      data?.profilePhotos.data.push(result.finalizeProfilePhotoAttachment);
      return data;
    },
  );

  cache.updateQuery<ProfileListQuery>(
    {
      query: PROFILE_LIST_QUERY,
    },
    (data) => {
      if (!data?.currentUser.profiles.data) return data;

      const profile = data.currentUser.profiles.data.find(
        (profile) => profile.id === args.input.profileId,
      );

      if (!profile) return data;

      profile.attachments.data.push(result.finalizeProfilePhotoAttachment);
      profile.attachments.total = profile.attachments.data.length;

      return data;
    },
  );
}

export function deleteProfilePhotoAttachment(
  result: DeleteProfilePhotoAttachmentMutation,
  args: DeleteProfilePhotoAttachmentMutationVariables,
  cache: Cache,
) {
  cache.updateQuery<ProfilePhotosListQuery>(
    {
      query: PROFILE_PHOTOS_QUERY,
      variables: {
        input: { profileId: args.input.profileId },
      },
    },
    (data) => {
      if (!data) return data;

      const profilePhotos = (data?.profilePhotos.data ?? []).filter(
        (photo) => photo.id !== result.deleteProfilePhotoAttachment.id,
      );

      data.profilePhotos.data = profilePhotos;
      data.profilePhotos.total = data.profilePhotos.data.length;

      return data;
    },
  );

  cache.updateQuery<ProfileListQuery>(
    {
      query: PROFILE_LIST_QUERY,
    },
    (data) => {
      if (!data?.currentUser.profiles.data) return data;

      const profile = data.currentUser.profiles.data.find(
        (profile) => profile.id === args.input.profileId,
      );

      if (!profile) return data;

      profile.attachments.data = profile.attachments.data.filter(
        (attachment) =>
          attachment.id !== result.deleteProfilePhotoAttachment.id,
      );
      profile.attachments.total = profile.attachments.data.length;

      return data;
    },
  );
}
