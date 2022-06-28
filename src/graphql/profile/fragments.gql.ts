import { gql } from '@urql/core';
import { ATTACHMENT_FRAGMENT } from '../attachment/fragments.gql';

export const PROFILE_FRAGMENT = gql`
  fragment ProfileFragment on LocalizedProfile {
    id
    firstName
    lastName
    phoneNumber
    email
    gender {
      value
      label
    }
    dateOfBirth
    occupation
    actorType {
      value
      label
    }
    occupation
    actingGenders {
      value
      label
    }
    attributes {
      value
      label
    }
    attributesDescription
    builds {
      value
      label
    }
    childrenSizeCm
    clothingSizeLowerBody
    clothingSizeUpperBody
    coursesDescriptions
    educations {
      id
      schoolName
      startDate
      endDate
      description
    }
    ethnicity {
      id
      countryCode
      name
      region
      subRegion
    }
    experienceYears
    genderDescription
    hairColor {
      value
      label
    }
    hairDescription
    hairDyed
    hairStyle {
      value
      label
    }
    heightCm
    knownForDescription
    preferredRoleTypes {
      value
      label
    }
    preferredProjectTypes {
      value
      label
    }
    languages {
      id
      name
      level
      isoCode
      description
      dialects
    }
    memberOfActorUnion
    municipality {
      id
      name
      region {
        id
        name
      }
    }
    municipalitiesOfInterest {
      id
      name
      region {
        id
        name
      }
    }
    residenceCountry {
      id
      countryCode
      name
      region
      subRegion
    }
    skinColor {
      value
      label
    }
    skills
    workingDescription
    urls {
      id
      name
      url
    }
    shoeSizeEu
    attachments {
      data {
        ...AttachmentFragment
      }
      total
    }
  }
  ${ATTACHMENT_FRAGMENT}
`;
