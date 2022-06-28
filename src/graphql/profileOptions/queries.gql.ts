import { gql } from '@urql/core';

// TODO: User one query for all profile options

export const GENDERS_QUERY = gql`
  query Genders {
    genders {
      value
      label
    }
  }
`;

export const ACTOR_TYPES_QUERY = gql`
  query ActorTypes {
    actorTypes {
      value
      label
    }
  }
`;

export const ROLE_TYPES_QUERY = gql`
  query RoleTypes {
    roleTypes {
      value
      label
    }
  }
`;

export const PROJECT_TYPES_QUERY = gql`
  query ProjectTypes {
    projectTypes {
      value
      label
    }
  }
`;

export const ATTRIBUTES_QUERY = gql`
  query Attributes {
    attributes {
      value
      label
    }
  }
`;

export const BUILD_TYPES_QUERY = gql`
  query BuildTypes {
    buildTypes {
      value
      label
    }
  }
`;

export const HAIR_STYLES_QUERY = gql`
  query HairStyles {
    hairStyles {
      value
      label
    }
  }
`;

export const HAIR_COLORS_QUERY = gql`
  query HairColors {
    hairColors {
      value
      label
    }
  }
`;

export const SKIN_COLORS_QUERY = gql`
  query SkinColors {
    skinColors {
      value
      label
    }
  }
`;

export const CLOTHING_SIZE_QUERY = gql`
  query ClothingSizes {
    clothingSizes {
      value
      label
    }
  }
`;
