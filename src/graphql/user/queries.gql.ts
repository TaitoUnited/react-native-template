import { gql } from '@urql/core';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;
