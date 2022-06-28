import { gql } from '@urql/core';
import { PROFILE_FRAGMENT } from './fragments.gql';

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      ...ProfileFragment
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      ...ProfileFragment
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfile($id: ID!) {
    deleteProfile(id: $id)
  }
`;

export const CREATE_PROFILE_PHOTO_ATTACHMENT = gql`
  mutation CreateProfilePhotoAttachment(
    $input: CreateProfilePhotoAttachmentInput!
  ) {
    createProfilePhotoAttachment(input: $input) {
      url
      headers {
        key
        value
      }
      id
    }
  }
`;

export const FINALIZE_PROFILE_PHOTO_ATTACHMENT = gql`
  mutation FinalizeProfilePhotoAttachment(
    $input: FinalizeProfilePhotoAttachmentInput!
  ) {
    finalizeProfilePhotoAttachment(input: $input) {
      id
      contentType
      title
      description
      filename
      fileUrl {
        originalUrl
        variantUrl {
          small
          medium
          large
        }
      }
      purpose
    }
  }
`;

export const DELETE_PROFILE_PHOTO_ATTACHMENT = gql`
  mutation DeleteProfilePhotoAttachment(
    $input: DeleteProfilePhotoAttachmentInput!
  ) {
    deleteProfilePhotoAttachment(input: $input) {
      id
      contentType
      title
      description
      filename
      fileUrl {
        originalUrl
        variantUrl {
          small
          medium
          large
        }
      }
    }
  }
`;
