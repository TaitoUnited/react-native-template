import type { ProfilePhase, ProfileFormValues } from './types';

export const PROFILE_PHASE_FIELDS: Record<
  ProfilePhase,
  Partial<Record<keyof ProfileFormValues, boolean>>
> = {
  // `true` means that the field is required for that phase to completed
  'basic-info': {
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    residenceCountry: true,
    municipalityCode: true,
    municipalitiesOfInterest: false,
    interestOfProduction: true,
  },
  languages: {},
  education: {},
  courses: {},
  'casting-images': {},
  'media-samples': {},
  appearance: {
    gender: true,
    genderDescription: false,
    actingGenders: true,
    hairColor: true,
    hairDescription: true,
    hairDyed: true,
    hairStyle: true,
    heightCm: true,
    skinColor: true,
    shoeSizeEu: true,
    attributes: true,
    attributesDescription: false,
    ethnicity: true,
    builds: true,
    clothingSize: true,
    clothingSizeLowerBody: true,
    clothingSizeUpperBody: true,
  },
  'acting-skills': {
    actorType: true,
    occupation: true,
    skills: true,
    coursesDescriptions: false,
    experienceYears: true,
    memberOfActorUnion: true,
    workingDescription: true,
    knownForDescription: false,
  },
  portfolio: {},
};
