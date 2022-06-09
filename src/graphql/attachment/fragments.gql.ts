import { gql } from '@urql/core';

export const ATTACHMENT_FRAGMENT = gql`
  fragment AttachmentFragment on Attachment {
    id
    filename
    title
    description
    contentType
    purpose
    fileUrl {
      originalUrl
      variantUrl {
        small
        medium
        large
      }
    }
  }
`;
