import { gql } from '@urql/core';

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      id
      name
    }
  }
`;

export const LANGUAGES_QUERY = gql`
  query Languages {
    languages {
      id
      name
    }
  }
`;

export const MUNICIPALITIES_QUERY = gql`
  query Municipalities {
    municipalities {
      id
      name
      region {
        id
        name
      }
    }
  }
`;
