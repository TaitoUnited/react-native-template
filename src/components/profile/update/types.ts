import { useProfileForm } from './form';
import { useDatasets } from './hooks';
import {
  ActorType,
  Attribute,
  BuildType,
  ClothingSize,
  Gender,
  HairColor,
  HairStyle,
  LocalizedProfile as _Profile,
  ProjectType,
  RoleType,
  SkinColor,
} from '~graphql/generated';

type Profile = Required<_Profile>;

export type ProfileFormValues = {
  // Basic info
  firstName: Profile['firstName'];
  lastName: Profile['lastName'];
  phoneNumber: null | string;
  email: null | string;
  dateOfBirth: null | Date; // in generated `Profile` type this is `any`
  residenceCountry: null | string;
  municipalityCode: null | string; // NOTE: in generated `UpdateProfile` type this is `string`
  municipalitiesOfInterest: null | string[]; // NOTE: in generated `UpdateProfile` type this is `string[]`
  preferredRoleTypes: null | RoleType[];
  preferredProjectTypes: null | ProjectType[];

  // Languages
  languages: Array<{
    isoCode: string;
    level: number;
    description: string;
  }>;

  // Appearance
  gender: null | Gender;
  genderDescription: Profile['genderDescription'];
  actingGenders: null | Gender[];
  hairColor: null | HairColor;
  hairDescription: Profile['hairDescription'];
  hairDyed: Profile['hairDyed'];
  hairStyle: null | HairStyle[];
  heightCm: null | string; // NOTE: in generated `Profile` type this is `number`;
  skinColor: null | SkinColor;
  shoeSizeEu: null | string; // NOTE: in generated `Profile` type this is `number`;
  attributes: null | Attribute[];
  attributesDescription: Profile['attributesDescription'];
  ethnicity: null | string[];
  builds: null | BuildType[];
  childrenSizeCm: null | string; // NOTE: in generated `Profile` type this is `number`;
  clothingSizeLowerBody: null | ClothingSize;
  clothingSizeUpperBody: null | ClothingSize;

  // Acting skills
  actorType: null | ActorType;
  occupation: Profile['occupation'];
  experienceYears: null | string; // NOTE: in generated `Profile` type this is `number`
  memberOfActorUnion: Profile['memberOfActorUnion'];
  workingDescription: Profile['workingDescription'];
  knownForDescription: Profile['knownForDescription'];
  skills: Profile['skills'];
  coursesDescriptions: Array<{
    description: string;
  }>;

  // Educations
  educations: Array<{
    description: string;
    schoolName: string;
    startDate: Date;
    endDate?: Date;
  }>;

  // Portfolio (note: `urls` is user-defined list of additional urls)
  facebook: null | string;
  tiktok: null | string;
  twitter: null | string;
  imdb: null | string;
  linkedin: null | string;
  showreel: null | string;
  urls: null | Array<{ name: string; url: string }>;
};

export type ProfilePhase =
  | 'basic-info'
  | 'languages'
  | 'education'
  | 'courses'
  | 'appearance'
  | 'acting-skills'
  | 'casting-images'
  | 'media-samples'
  | 'portfolio';

export type ProfilePhaseItems = Array<{
  id: ProfilePhase;
  title: string;
  isRequired: boolean;
}>;

export type ProfileForm = ReturnType<typeof useProfileForm>['form'];

export type ProfileLanguageFields = ReturnType<
  typeof useProfileForm
>['languages'];

export type ProfileEducationFields = ReturnType<
  typeof useProfileForm
>['educations'];

export type ProfileUrlFields = ReturnType<typeof useProfileForm>['urls'];

export type ProfileCoursesFields = ReturnType<typeof useProfileForm>['courses'];

export type Datasets = ReturnType<typeof useDatasets>;
