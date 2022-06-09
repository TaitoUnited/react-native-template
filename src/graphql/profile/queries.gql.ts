import { gql } from '@urql/core';
import { PROFILE_FRAGMENT } from './fragments.gql';
import { ATTACHMENT_FRAGMENT } from '~graphql/attachment/fragments.gql';

export const PROFILE_QUERY = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      ...ProfileFragment
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const PROFILE_LIST_QUERY = gql`
  query ProfileList {
    currentUser {
      id
      profiles {
        data {
          ...ProfileFragment
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const PROFILE_PHOTOS_QUERY = gql`
  query ProfilePhotosList($input: ListProfilePhotoAttachmentInput!) {
    profilePhotos(input: $input) {
      total
      data {
        ...AttachmentFragment
      }
    }
  }
  ${ATTACHMENT_FRAGMENT}
`;
