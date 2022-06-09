import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export enum ActorType {
  Amateur = 'AMATEUR',
  Extra = 'EXTRA',
  Professional = 'PROFESSIONAL',
  SemiProfessional = 'SEMI_PROFESSIONAL'
}

export type Admin = {
  __typename?: 'Admin';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  latestProjects: Array<Project>;
};


export type AdminLatestProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type AdminFilter = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Attachment = {
  __typename?: 'Attachment';
  contentType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<FileUrl>;
  filename?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profileId?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  purpose?: Maybe<AttachmentPurpose>;
  title?: Maybe<Scalars['String']>;
};

export type AttachmentFilter = {
  attachmentType: Scalars['String'];
  contentType: Scalars['String'];
  description: Scalars['String'];
  filename: Scalars['String'];
  profileId: Scalars['String'];
  projectId: Scalars['String'];
  title: Scalars['String'];
};

export enum AttachmentPurpose {
  ActorFullLengthShot = 'ACTOR_FULL_LENGTH_SHOT',
  ActorHeadshotNeutral = 'ACTOR_HEADSHOT_NEUTRAL',
  ActorHeadshotSmile = 'ACTOR_HEADSHOT_SMILE',
  ProjectBanner = 'PROJECT_BANNER',
  ProjectSquareBanner = 'PROJECT_SQUARE_BANNER',
  RoleBanner = 'ROLE_BANNER',
  RoleSquareBanner = 'ROLE_SQUARE_BANNER'
}

export type AttachmentUploadRequestDetails = {
  __typename?: 'AttachmentUploadRequestDetails';
  headers: Array<KeyValue>;
  id: Scalars['String'];
  url: Scalars['String'];
};

export enum Attribute {
  Amputee = 'AMPUTEE',
  BlindSightImpaired = 'BLIND_SIGHT_IMPAIRED',
  DeafHearingImpaired = 'DEAF_HEARING_IMPAIRED',
  DownSyndrome = 'DOWN_SYNDROME',
  Dwarfism = 'DWARFISM',
  FaceTattoo = 'FACE_TATTOO',
  FrecklesInFace = 'FRECKLES_IN_FACE',
  PiercingInFace = 'PIERCING_IN_FACE',
  SkinToneCondition = 'SKIN_TONE_CONDITION',
  TattooInBody = 'TATTOO_IN_BODY',
  WheelchairUser = 'WHEELCHAIR_USER'
}

export enum BuildType {
  Curvy = 'CURVY',
  ExtraSlim = 'EXTRA_SLIM',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Muscular = 'MUSCULAR',
  Slim = 'SLIM',
  VeryLarge = 'VERY_LARGE'
}

export enum ClothingSize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
  Xxs = 'XXS',
  Xxxl = 'XXXL'
}

export type Country = {
  __typename?: 'Country';
  countryCode: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  region: Scalars['String'];
  subRegion: Scalars['String'];
};

export type CreateAdminInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type CreateAttachmentInput = {
  contentType: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  filename?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<AttachmentPurpose>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateAttachmentInputBase = {
  contentType: Scalars['String'];
  filename?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<AttachmentPurpose>;
};

export type CreateProfileInput = {
  actingGenders?: InputMaybe<Array<Gender>>;
  actorType?: InputMaybe<ActorType>;
  attributes?: InputMaybe<Array<Attribute>>;
  attributesDescription?: InputMaybe<Scalars['String']>;
  builds?: InputMaybe<Array<BuildType>>;
  childrenSizeCm?: InputMaybe<Scalars['Float']>;
  clothingSizeLowerBody?: InputMaybe<ClothingSize>;
  clothingSizeUpperBody?: InputMaybe<ClothingSize>;
  coursesDescriptions?: InputMaybe<Array<Scalars['String']>>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  educations?: InputMaybe<Array<ProfileEducationInput>>;
  email?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Array<Scalars['String']>>;
  experienceYears?: InputMaybe<Scalars['Float']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  genderDescription?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<HairColor>;
  hairDescription?: InputMaybe<Scalars['String']>;
  hairDyed?: InputMaybe<Scalars['Boolean']>;
  hairStyle?: InputMaybe<Array<HairStyle>>;
  heightCm?: InputMaybe<Scalars['Float']>;
  knownForDescription?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<ProfileLanguageInput>>;
  lastName?: InputMaybe<Scalars['String']>;
  memberOfActorUnion?: InputMaybe<Scalars['Boolean']>;
  municipalitiesOfInterest?: InputMaybe<Array<Scalars['Float']>>;
  municipalityCode?: InputMaybe<Scalars['Float']>;
  occupation?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  preferredProjectTypes?: InputMaybe<Array<ProjectType>>;
  preferredRoleTypes?: InputMaybe<Array<RoleType>>;
  residenceCountry?: InputMaybe<Scalars['String']>;
  shoeSizeEu?: InputMaybe<Scalars['Float']>;
  skills?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<SkinColor>;
  urls?: InputMaybe<Array<ProfileUrlInput>>;
  workingDescription?: InputMaybe<Scalars['String']>;
};

export type CreateProfilePhotoAttachmentInput = {
  contentType: Scalars['String'];
  filename?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  purpose?: InputMaybe<AttachmentPurpose>;
};

export type CreateProjectInput = {
  clientAdditionalInfo: Scalars['String'];
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  clientPhoneNo: Scalars['String'];
  countries: Array<Scalars['String']>;
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  municipalities?: InputMaybe<Array<Scalars['Float']>>;
  name: Scalars['String'];
  notes: Scalars['String'];
  producer: Scalars['String'];
  type: ProjectType;
  workingTitle: Scalars['String'];
};

export type CreateRoleInput = {
  applicationDeadline: Scalars['DateTime'];
  applicationDeadlineExtended?: InputMaybe<Scalars['DateTime']>;
  auditionDescription: Scalars['String'];
  compensationDescription: Scalars['String'];
  countries: Array<Scalars['String']>;
  dayEndsTime?: InputMaybe<Scalars['String']>;
  dayStartsTime?: InputMaybe<Scalars['String']>;
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  locationsPrivate: Scalars['String'];
  maxCompensationCents: Scalars['Float'];
  minCompensationCents: Scalars['Float'];
  name: Scalars['String'];
  notes: Scalars['String'];
  projectId: Scalars['ID'];
  publicationRightsArea?: InputMaybe<Scalars['String']>;
  publicationRightsAreaPrivate?: InputMaybe<Scalars['String']>;
  publicationRightsMedia?: InputMaybe<Scalars['String']>;
  publicationRightsMediaPrivate?: InputMaybe<Scalars['String']>;
  publicationRightsTimeDays?: InputMaybe<Scalars['Float']>;
  publicationRightsTimeDaysPrivate?: InputMaybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  type: RoleType;
};

export type DeleteAttachmentInput = {
  id: Scalars['String'];
};

export type DeleteAttachmentInputInternal = {
  id: Scalars['String'];
};

export type DeleteProfilePhotoAttachmentInput = {
  id: Scalars['String'];
  profileId: Scalars['String'];
};

/** Contains downloadable FileUrl. If the file is photo, photo variant urls are added. */
export type FileUrl = {
  __typename?: 'FileUrl';
  originalUrl: Scalars['String'];
  variantUrl?: Maybe<Variants>;
};

export type Filter = {
  field: Scalars['String'];
  operator: FilterOperator;
  value: Scalars['String'];
  /** Determines how the value is treated */
  valueType?: InputMaybe<ValueType>;
};

export type FilterGroup = {
  filters: Array<Filter>;
  operator: FilterLogicalOperator;
};

export enum FilterLogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export enum FilterOperator {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Ilike = 'ILIKE',
  Like = 'LIKE',
  Lt = 'LT',
  Lte = 'LTE',
  Neq = 'NEQ'
}

export type FinalizeProfilePhotoAttachmentInput = {
  id: Scalars['String'];
  profileId: Scalars['String'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  Other = 'OTHER',
  TransMan = 'TRANS_MAN',
  TransWoman = 'TRANS_WOMAN'
}

export enum HairColor {
  Black = 'BLACK',
  BlondLight = 'BLOND_LIGHT',
  BrightShock = 'BRIGHT_SHOCK',
  DarkBrown = 'DARK_BROWN',
  Ginger = 'GINGER',
  Grey = 'GREY',
  LightBrown = 'LIGHT_BROWN',
  Red = 'RED'
}

export enum HairStyle {
  AfroTextured = 'AFRO_TEXTURED',
  Bald = 'BALD',
  ChinLength = 'CHIN_LENGTH',
  CrewCut = 'CREW_CUT',
  Curly = 'CURLY',
  Dreadlocks = 'DREADLOCKS',
  Long = 'LONG',
  MiddleLength = 'MIDDLE_LENGTH',
  Receding = 'RECEDING',
  Short = 'SHORT',
  Straight = 'STRAIGHT',
  Thick = 'THICK',
  Thin = 'THIN',
  VeryLong = 'VERY_LONG',
  VeryShort = 'VERY_SHORT',
  Wavy = 'WAVY'
}

export type KeyValue = {
  __typename?: 'KeyValue';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ListProfilePhotoAttachmentInput = {
  profileId: Scalars['String'];
};

export type LocalizedProfile = {
  __typename?: 'LocalizedProfile';
  actingGenders?: Maybe<Array<ProfileGender>>;
  actorType?: Maybe<ProfileActorType>;
  attachments: PaginatedAttachments;
  attributes?: Maybe<Array<ProfileAttribute>>;
  attributesDescription?: Maybe<Scalars['String']>;
  builds?: Maybe<Array<ProfileBuildType>>;
  childrenSizeCm?: Maybe<Scalars['Float']>;
  clothingSizeLowerBody?: Maybe<ClothingSize>;
  clothingSizeUpperBody?: Maybe<ClothingSize>;
  coursesDescriptions?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  educations: Array<ProfileEducation>;
  email?: Maybe<Scalars['String']>;
  ethnicity?: Maybe<Array<Country>>;
  experienceYears?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<ProfileGender>;
  genderDescription?: Maybe<Scalars['String']>;
  hairColor?: Maybe<ProfileHairColor>;
  hairDescription?: Maybe<Scalars['String']>;
  hairDyed?: Maybe<Scalars['Boolean']>;
  hairStyle?: Maybe<Array<ProfileHairStyle>>;
  heightCm?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  knownForDescription?: Maybe<Scalars['String']>;
  languages: Array<ProfileLanguage>;
  lastName?: Maybe<Scalars['String']>;
  memberOfActorUnion?: Maybe<Scalars['Boolean']>;
  municipalitiesOfInterest?: Maybe<Array<Municipality>>;
  municipality?: Maybe<Municipality>;
  occupation?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  preferredProjectTypes?: Maybe<Array<ProjectLocalType>>;
  preferredRoleTypes?: Maybe<Array<RoleLocalType>>;
  residenceCountry?: Maybe<Country>;
  shoeSizeEu?: Maybe<Scalars['Float']>;
  skills?: Maybe<Scalars['String']>;
  skinColor?: Maybe<ProfileSkinColor>;
  updatedAt: Scalars['DateTime'];
  urls: Array<ProfileUrl>;
  user: User;
  workingDescription?: Maybe<Scalars['String']>;
};

export type LocalizedProject = {
  __typename?: 'LocalizedProject';
  clientAdditionalInfo: Scalars['String'];
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  clientPhoneNo: Scalars['String'];
  countries: Array<Country>;
  createdAt: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isFavourite: Scalars['Boolean'];
  municipalities?: Maybe<Array<Municipality>>;
  name: Scalars['String'];
  notes: Scalars['String'];
  producer: Scalars['String'];
  roles: PaginatedLocalizedRoles;
  type: ProjectLocalType;
  updatedAt: Scalars['DateTime'];
  workingTitle: Scalars['String'];
};

export type LocalizedProjectRestricted = {
  __typename?: 'LocalizedProjectRestricted';
  countries: Array<Country>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  municipalities?: Maybe<Array<Municipality>>;
  name: Scalars['String'];
  producer: Scalars['String'];
  type: ProjectLocalType;
  updatedAt: Scalars['DateTime'];
};

export type LocalizedRole = {
  __typename?: 'LocalizedRole';
  applicationDeadline: Scalars['DateTime'];
  applicationDeadlineExtended?: Maybe<Scalars['DateTime']>;
  auditionDescription: Scalars['String'];
  compensationDescription: Scalars['String'];
  countries: Array<Country>;
  createdAt: Scalars['DateTime'];
  dayEndsTime?: Maybe<Scalars['String']>;
  dayStartsTime?: Maybe<Scalars['String']>;
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  locationsPrivate: Scalars['String'];
  maxCompensationCents: Scalars['Float'];
  minCompensationCents: Scalars['Float'];
  name: Scalars['String'];
  notes: Scalars['String'];
  publicationRightsArea?: Maybe<Scalars['String']>;
  publicationRightsAreaPrivate?: Maybe<Scalars['String']>;
  publicationRightsMedia?: Maybe<Scalars['String']>;
  publicationRightsMediaPrivate?: Maybe<Scalars['String']>;
  publicationRightsTimeDays?: Maybe<Scalars['Float']>;
  publicationRightsTimeDaysPrivate?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  type: RoleLocalType;
  updatedAt: Scalars['DateTime'];
};

export type LocalizedRoleRestricted = {
  __typename?: 'LocalizedRoleRestricted';
  applicationDeadline: Scalars['DateTime'];
  applicationDeadlineExtended?: Maybe<Scalars['DateTime']>;
  auditionDescription: Scalars['String'];
  compensationDescription: Scalars['String'];
  countries: Array<Country>;
  createdAt: Scalars['DateTime'];
  dayEndsTime?: Maybe<Scalars['String']>;
  dayStartsTime?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  maxCompensationCents: Scalars['Float'];
  minCompensationCents: Scalars['Float'];
  name: Scalars['String'];
  publicationRightsArea?: Maybe<Scalars['String']>;
  publicationRightsMedia?: Maybe<Scalars['String']>;
  publicationRightsTimeDays?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  type: RoleLocalType;
  updatedAt: Scalars['DateTime'];
};

export type LoginAdminInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserResult = {
  __typename?: 'LoginUserResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Municipality = {
  __typename?: 'Municipality';
  id: Scalars['Int'];
  name: Scalars['String'];
  region: MunicipalityRegion;
};

export type MunicipalityRegion = {
  __typename?: 'MunicipalityRegion';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavouriteProject: Array<LocalizedProject>;
  addLatestProject: Scalars['Boolean'];
  createProfile: LocalizedProfile;
  /**
   *
   *       Creates a new photo attachment for profile.
   *       Returns URL and HTTP headers that should be used to upload the file using HTTP PUT.
   *
   */
  createProfilePhotoAttachment: AttachmentUploadRequestDetails;
  createProject: LocalizedProject;
  createRole: LocalizedRole;
  deleteProfile: Scalars['ID'];
  /** Deletes profile photo attachment from the database and the storage bucket if the bucket is configured. Returns photo attachment that was deleted. */
  deleteProfilePhotoAttachment: Attachment;
  deleteProject: Scalars['ID'];
  deleteRole: Scalars['ID'];
  deleteUser: Scalars['ID'];
  /** Finalizes uploaded profile photo attachment. Call this after successful HTTP PUT upload. */
  finalizeProfilePhotoAttachment: Attachment;
  loginAdmin: Scalars['Boolean'];
  loginUser: LoginUserResult;
  refreshUserTokens: LoginUserResult;
  registerUser: RegisterUserResult;
  removeFavouriteProject: Array<LocalizedProject>;
  updateProfile: LocalizedProfile;
  updateProject: LocalizedProject;
  updateRole: LocalizedRole;
  updateUser: User;
};


export type MutationAddFavouriteProjectArgs = {
  projectId: Scalars['ID'];
};


export type MutationAddLatestProjectArgs = {
  projectId: Scalars['ID'];
};


export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


export type MutationCreateProfilePhotoAttachmentArgs = {
  input: CreateProfilePhotoAttachmentInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationDeleteProfileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProfilePhotoAttachmentArgs = {
  input: DeleteProfilePhotoAttachmentInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationFinalizeProfilePhotoAttachmentArgs = {
  input: FinalizeProfilePhotoAttachmentInput;
};


export type MutationLoginAdminArgs = {
  input: LoginAdminInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRefreshUserTokensArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRemoveFavouriteProjectArgs = {
  projectId: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Order = {
  dir: OrderDirection;
  field: Scalars['String'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginatedAdmins = {
  __typename?: 'PaginatedAdmins';
  data: Array<Admin>;
  total: Scalars['Float'];
};

export type PaginatedAttachments = {
  __typename?: 'PaginatedAttachments';
  data: Array<Attachment>;
  total: Scalars['Float'];
};

export type PaginatedLocalizedProfiles = {
  __typename?: 'PaginatedLocalizedProfiles';
  data: Array<LocalizedProfile>;
  total: Scalars['Float'];
};

export type PaginatedLocalizedProjects = {
  __typename?: 'PaginatedLocalizedProjects';
  data: Array<LocalizedProject>;
  total: Scalars['Float'];
};

export type PaginatedLocalizedRoles = {
  __typename?: 'PaginatedLocalizedRoles';
  data: Array<LocalizedRole>;
  total: Scalars['Float'];
};

export type PaginatedLocalizedRolesRestricted = {
  __typename?: 'PaginatedLocalizedRolesRestricted';
  data: Array<LocalizedRoleRestricted>;
  total: Scalars['Float'];
};

export type PaginatedProfiles = {
  __typename?: 'PaginatedProfiles';
  data: Array<Profile>;
  total: Scalars['Float'];
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  data: Array<Project>;
  total: Scalars['Float'];
};

export type PaginatedRoles = {
  __typename?: 'PaginatedRoles';
  data: Array<Role>;
  total: Scalars['Float'];
};

export type PaginatedRolesRestricted = {
  __typename?: 'PaginatedRolesRestricted';
  data: Array<RoleRestricted>;
  total: Scalars['Float'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  total: Scalars['Float'];
};

export type Pagination = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type Profile = {
  __typename?: 'Profile';
  actingGenders?: Maybe<Array<Gender>>;
  actorType?: Maybe<ActorType>;
  attributes?: Maybe<Array<Attribute>>;
  attributesDescription?: Maybe<Scalars['String']>;
  builds?: Maybe<Array<BuildType>>;
  childrenSizeCm?: Maybe<Scalars['Float']>;
  clothingSizeLowerBody?: Maybe<ClothingSize>;
  clothingSizeUpperBody?: Maybe<ClothingSize>;
  coursesDescriptions?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  ethnicity?: Maybe<Array<Scalars['String']>>;
  experienceYears?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  genderDescription?: Maybe<Scalars['String']>;
  hairColor?: Maybe<HairColor>;
  hairDescription?: Maybe<Scalars['String']>;
  hairDyed?: Maybe<Scalars['Boolean']>;
  hairStyle?: Maybe<Array<HairStyle>>;
  heightCm?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  knownForDescription?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  memberOfActorUnion?: Maybe<Scalars['Boolean']>;
  municipalitiesOfInterest?: Maybe<Array<Scalars['Float']>>;
  municipalityCode?: Maybe<Scalars['Float']>;
  occupation?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  preferredProjectTypes?: Maybe<Array<ProjectType>>;
  preferredRoleTypes?: Maybe<Array<RoleType>>;
  residenceCountry?: Maybe<Scalars['String']>;
  shoeSizeEu?: Maybe<Scalars['Float']>;
  skills?: Maybe<Scalars['String']>;
  skinColor?: Maybe<SkinColor>;
  updatedAt: Scalars['DateTime'];
  workingDescription?: Maybe<Scalars['String']>;
};

export type ProfileActorType = {
  __typename?: 'ProfileActorType';
  label: Scalars['String'];
  value: ActorType;
};

export type ProfileAttribute = {
  __typename?: 'ProfileAttribute';
  label: Scalars['String'];
  value: Attribute;
};

export type ProfileBuildType = {
  __typename?: 'ProfileBuildType';
  label: Scalars['String'];
  value: BuildType;
};

export type ProfileClothingSize = {
  __typename?: 'ProfileClothingSize';
  label: Scalars['String'];
  value: ClothingSize;
};

export type ProfileEducation = {
  __typename?: 'ProfileEducation';
  description: Scalars['String'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  schoolName: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type ProfileEducationInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  schoolName: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type ProfileFilter = {
  actingGenders: Array<Gender>;
  actorType: Scalars['String'];
  childrenSizeCm: Scalars['Float'];
  clothingSizeLowerBody: Scalars['String'];
  clothingSizeUpperBody: Scalars['String'];
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  ethnicity: Array<Scalars['String']>;
  experienceYears: Scalars['Float'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  hairColor: Scalars['String'];
  hairDyed: Scalars['Boolean'];
  hairStyle: Array<HairStyle>;
  heightCm: Scalars['Float'];
  languageIsoCodes: Array<Scalars['String']>;
  lastName: Scalars['String'];
  memberOfActorUnion: Scalars['Boolean'];
  municipalitiesOfInterest: Array<Scalars['String']>;
  municipalityCode: Scalars['Float'];
  residenceCountry: Scalars['String'];
  shoeSizeEu: Scalars['Float'];
  skinColor: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type ProfileGender = {
  __typename?: 'ProfileGender';
  label: Scalars['String'];
  value: Gender;
};

export type ProfileHairColor = {
  __typename?: 'ProfileHairColor';
  label: Scalars['String'];
  value: HairColor;
};

export type ProfileHairStyle = {
  __typename?: 'ProfileHairStyle';
  label: Scalars['String'];
  value: HairStyle;
};

export type ProfileLanguage = {
  __typename?: 'ProfileLanguage';
  description: Scalars['String'];
  dialects?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  isoCode: Scalars['String'];
  level: Scalars['Float'];
  name: Scalars['String'];
};

export type ProfileLanguageInput = {
  description: Scalars['String'];
  dialects?: InputMaybe<Array<Scalars['String']>>;
  isoCode: Scalars['String'];
  level: Scalars['Float'];
};

export type ProfileSkinColor = {
  __typename?: 'ProfileSkinColor';
  label: Scalars['String'];
  value: SkinColor;
};

export type ProfileUrl = {
  __typename?: 'ProfileUrl';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ProfileUrlInput = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  clientAdditionalInfo: Scalars['String'];
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  clientPhoneNo: Scalars['String'];
  countries: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  municipalities?: Maybe<Array<Scalars['Float']>>;
  name: Scalars['String'];
  notes: Scalars['String'];
  producer: Scalars['String'];
  type: ProjectType;
  updatedAt: Scalars['DateTime'];
  workingTitle: Scalars['String'];
};

export type ProjectFilter = {
  createdAt: Scalars['DateTime'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectLocalType = {
  __typename?: 'ProjectLocalType';
  label: Scalars['String'];
  value: ProjectType;
};

export type ProjectRestricted = {
  __typename?: 'ProjectRestricted';
  countries: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  municipalities?: Maybe<Array<Scalars['Float']>>;
  name: Scalars['String'];
  producer: Scalars['String'];
  type: ProjectType;
  updatedAt: Scalars['DateTime'];
};

export enum ProjectType {
  Advert = 'ADVERT',
  Movie = 'MOVIE',
  Other = 'OTHER',
  Reality = 'REALITY',
  Series = 'SERIES'
}

export type Query = {
  __typename?: 'Query';
  actorTypes: Array<ProfileActorType>;
  /** Returns all MIME types allowed for profile attachments. */
  allowedProfileAttachmentMimeTypes: Array<Scalars['String']>;
  attributes: Array<ProfileAttribute>;
  buildTypes: Array<ProfileBuildType>;
  clothingSizes: Array<ProfileClothingSize>;
  countries: Array<Country>;
  currentAdmin: Admin;
  currentUser: User;
  genders: Array<ProfileGender>;
  hairColors: Array<ProfileHairColor>;
  hairStyles: Array<ProfileHairStyle>;
  languages: Array<Language>;
  municipalities: Array<Municipality>;
  profile: LocalizedProfile;
  /** Returns all photos a profile has */
  profilePhotos: PaginatedAttachments;
  profiles: PaginatedLocalizedProfiles;
  project: LocalizedProject;
  projectRestricted: LocalizedProjectRestricted;
  projectTypes: Array<ProjectLocalType>;
  projects: PaginatedLocalizedProjects;
  role: LocalizedRole;
  roleRestricted: LocalizedRoleRestricted;
  roleTypes: Array<RoleLocalType>;
  roles: PaginatedLocalizedRoles;
  rolesRestricted: PaginatedLocalizedRolesRestricted;
  skinColors: Array<ProfileSkinColor>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilePhotosArgs = {
  input: ListProfilePhotoAttachmentInput;
};


export type QueryProfilesArgs = {
  filterGroups?: InputMaybe<Array<FilterGroup>>;
  order?: InputMaybe<Order>;
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryProjectRestrictedArgs = {
  id: Scalars['ID'];
};


export type QueryProjectsArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRoleRestrictedArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryRolesRestrictedArgs = {
  search?: InputMaybe<Scalars['String']>;
};

export type ReadProfileAttachmentInput = {
  id: Scalars['String'];
  profileId: Scalars['String'];
};

export type ReadProfilePhotoAttachmentInput = {
  id: Scalars['String'];
  profileId: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type RegisterUserResult = {
  __typename?: 'RegisterUserResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type RequestDetails = {
  __typename?: 'RequestDetails';
  headers: Array<KeyValue>;
  url: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  applicationDeadline: Scalars['DateTime'];
  applicationDeadlineExtended?: Maybe<Scalars['DateTime']>;
  auditionDescription: Scalars['String'];
  compensationDescription: Scalars['String'];
  countries: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dayEndsTime?: Maybe<Scalars['String']>;
  dayStartsTime?: Maybe<Scalars['String']>;
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  locationsPrivate: Scalars['String'];
  maxCompensationCents: Scalars['Float'];
  minCompensationCents: Scalars['Float'];
  name: Scalars['String'];
  notes: Scalars['String'];
  publicationRightsArea?: Maybe<Scalars['String']>;
  publicationRightsAreaPrivate?: Maybe<Scalars['String']>;
  publicationRightsMedia?: Maybe<Scalars['String']>;
  publicationRightsMediaPrivate?: Maybe<Scalars['String']>;
  publicationRightsTimeDays?: Maybe<Scalars['Float']>;
  publicationRightsTimeDaysPrivate?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  type: RoleType;
  updatedAt: Scalars['DateTime'];
};

export type RoleFilter = {
  createdAt: Scalars['DateTime'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  projectId: Scalars['ID'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RoleLocalType = {
  __typename?: 'RoleLocalType';
  label: Scalars['String'];
  value: RoleType;
};

export type RoleRestricted = {
  __typename?: 'RoleRestricted';
  applicationDeadline: Scalars['DateTime'];
  applicationDeadlineExtended?: Maybe<Scalars['DateTime']>;
  auditionDescription: Scalars['String'];
  compensationDescription: Scalars['String'];
  countries: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dayEndsTime?: Maybe<Scalars['String']>;
  dayStartsTime?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  maxCompensationCents: Scalars['Float'];
  minCompensationCents: Scalars['Float'];
  name: Scalars['String'];
  publicationRightsArea?: Maybe<Scalars['String']>;
  publicationRightsMedia?: Maybe<Scalars['String']>;
  publicationRightsTimeDays?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  type: RoleType;
  updatedAt: Scalars['DateTime'];
};

export enum RoleType {
  BitPart = 'BIT_PART',
  Extra = 'EXTRA',
  Lead = 'LEAD',
  Supporting = 'SUPPORTING'
}

export enum SkinColor {
  DarkBrown = 'DARK_BROWN',
  ExtraLight = 'EXTRA_LIGHT',
  Light = 'LIGHT',
  LightBrown = 'LIGHT_BROWN',
  MediumBrown = 'MEDIUM_BROWN',
  Olive = 'OLIVE',
  Tanned = 'TANNED'
}

export type UpdateAttachmentInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  purpose?: InputMaybe<AttachmentPurpose>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  actingGenders?: InputMaybe<Array<Gender>>;
  actorType?: InputMaybe<ActorType>;
  attributes?: InputMaybe<Array<Attribute>>;
  attributesDescription?: InputMaybe<Scalars['String']>;
  builds?: InputMaybe<Array<BuildType>>;
  childrenSizeCm?: InputMaybe<Scalars['Float']>;
  clothingSizeLowerBody?: InputMaybe<ClothingSize>;
  clothingSizeUpperBody?: InputMaybe<ClothingSize>;
  coursesDescriptions?: InputMaybe<Array<Scalars['String']>>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  educations?: InputMaybe<Array<ProfileEducationInput>>;
  email?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Array<Scalars['String']>>;
  experienceYears?: InputMaybe<Scalars['Float']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  genderDescription?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<HairColor>;
  hairDescription?: InputMaybe<Scalars['String']>;
  hairDyed?: InputMaybe<Scalars['Boolean']>;
  hairStyle?: InputMaybe<Array<HairStyle>>;
  heightCm?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  knownForDescription?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<ProfileLanguageInput>>;
  lastName?: InputMaybe<Scalars['String']>;
  memberOfActorUnion?: InputMaybe<Scalars['Boolean']>;
  municipalitiesOfInterest?: InputMaybe<Array<Scalars['Float']>>;
  municipalityCode?: InputMaybe<Scalars['Float']>;
  occupation?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  preferredProjectTypes?: InputMaybe<Array<ProjectType>>;
  preferredRoleTypes?: InputMaybe<Array<RoleType>>;
  residenceCountry?: InputMaybe<Scalars['String']>;
  shoeSizeEu?: InputMaybe<Scalars['Float']>;
  skills?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<SkinColor>;
  urls?: InputMaybe<Array<ProfileUrlInput>>;
  workingDescription?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  clientAdditionalInfo?: InputMaybe<Scalars['String']>;
  clientEmail?: InputMaybe<Scalars['String']>;
  clientName?: InputMaybe<Scalars['String']>;
  clientPhoneNo?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  municipalities?: InputMaybe<Array<Scalars['Float']>>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  producer?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProjectType>;
  workingTitle?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  applicationDeadline?: InputMaybe<Scalars['DateTime']>;
  applicationDeadlineExtended?: InputMaybe<Scalars['DateTime']>;
  auditionDescription?: InputMaybe<Scalars['String']>;
  compensationDescription?: InputMaybe<Scalars['String']>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  dayEndsTime?: InputMaybe<Scalars['String']>;
  dayStartsTime?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isPublic?: InputMaybe<Scalars['Boolean']>;
  locationsPrivate?: InputMaybe<Scalars['String']>;
  maxCompensationCents?: InputMaybe<Scalars['Float']>;
  minCompensationCents?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  publicationRightsArea?: InputMaybe<Scalars['String']>;
  publicationRightsAreaPrivate?: InputMaybe<Scalars['String']>;
  publicationRightsMedia?: InputMaybe<Scalars['String']>;
  publicationRightsMediaPrivate?: InputMaybe<Scalars['String']>;
  publicationRightsTimeDays?: InputMaybe<Scalars['Float']>;
  publicationRightsTimeDaysPrivate?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<RoleType>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpsertProfileInput = {
  actingGenders?: InputMaybe<Array<Gender>>;
  actorType?: InputMaybe<ActorType>;
  attributes?: InputMaybe<Array<Attribute>>;
  attributesDescription?: InputMaybe<Scalars['String']>;
  builds?: InputMaybe<Array<BuildType>>;
  childrenSizeCm?: InputMaybe<Scalars['Float']>;
  clothingSizeLowerBody?: InputMaybe<ClothingSize>;
  clothingSizeUpperBody?: InputMaybe<ClothingSize>;
  coursesDescriptions?: InputMaybe<Array<Scalars['String']>>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  educations?: InputMaybe<Array<ProfileEducationInput>>;
  email?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Array<Scalars['String']>>;
  experienceYears?: InputMaybe<Scalars['Float']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  genderDescription?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<HairColor>;
  hairDescription?: InputMaybe<Scalars['String']>;
  hairDyed?: InputMaybe<Scalars['Boolean']>;
  hairStyle?: InputMaybe<Array<HairStyle>>;
  heightCm?: InputMaybe<Scalars['Float']>;
  knownForDescription?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<ProfileLanguageInput>>;
  lastName?: InputMaybe<Scalars['String']>;
  memberOfActorUnion?: InputMaybe<Scalars['Boolean']>;
  municipalitiesOfInterest?: InputMaybe<Array<Scalars['Float']>>;
  municipalityCode?: InputMaybe<Scalars['Float']>;
  occupation?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  preferredProjectTypes?: InputMaybe<Array<ProjectType>>;
  preferredRoleTypes?: InputMaybe<Array<RoleType>>;
  residenceCountry?: InputMaybe<Scalars['String']>;
  shoeSizeEu?: InputMaybe<Scalars['Float']>;
  skills?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<SkinColor>;
  urls?: InputMaybe<Array<ProfileUrlInput>>;
  workingDescription?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  profiles: PaginatedLocalizedProfiles;
};

export type UserFilter = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export enum ValueType {
  Date = 'DATE',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type Variants = {
  __typename?: 'Variants';
  large?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

export type AttachmentFragmentFragment = { __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string }> };

export type LanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguagesQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: string, name: string }> };

export type MunicipalitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type MunicipalitiesQuery = { __typename?: 'Query', municipalities: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> };

export type ProfileFragmentFragment = { __typename?: 'LocalizedProfile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, dateOfBirth?: any | null, occupation?: string | null, attributesDescription?: string | null, childrenSizeCm?: number | null, clothingSizeLowerBody?: ClothingSize | null, clothingSizeUpperBody?: ClothingSize | null, coursesDescriptions?: Array<string> | null, experienceYears?: number | null, genderDescription?: string | null, hairDescription?: string | null, hairDyed?: boolean | null, heightCm?: number | null, knownForDescription?: string | null, memberOfActorUnion?: boolean | null, skills?: string | null, workingDescription?: string | null, shoeSizeEu?: number | null, gender?: { __typename?: 'ProfileGender', value: Gender, label: string } | null, actorType?: { __typename?: 'ProfileActorType', value: ActorType, label: string } | null, actingGenders?: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> | null, attributes?: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> | null, builds?: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> | null, educations: Array<{ __typename?: 'ProfileEducation', id: string, schoolName: string, startDate: any, endDate?: any | null, description: string }>, ethnicity?: Array<{ __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string }> | null, hairColor?: { __typename?: 'ProfileHairColor', value: HairColor, label: string } | null, hairStyle?: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> | null, preferredRoleTypes?: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> | null, preferredProjectTypes?: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> | null, languages: Array<{ __typename?: 'ProfileLanguage', id: string, name: string, level: number, isoCode: string, description: string, dialects?: Array<string> | null }>, municipality?: { __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } } | null, municipalitiesOfInterest?: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> | null, residenceCountry?: { __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string } | null, skinColor?: { __typename?: 'ProfileSkinColor', value: SkinColor, label: string } | null, urls: Array<{ __typename?: 'ProfileUrl', id: string, name: string, url: string }>, attachments: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'LocalizedProfile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, dateOfBirth?: any | null, occupation?: string | null, attributesDescription?: string | null, childrenSizeCm?: number | null, clothingSizeLowerBody?: ClothingSize | null, clothingSizeUpperBody?: ClothingSize | null, coursesDescriptions?: Array<string> | null, experienceYears?: number | null, genderDescription?: string | null, hairDescription?: string | null, hairDyed?: boolean | null, heightCm?: number | null, knownForDescription?: string | null, memberOfActorUnion?: boolean | null, skills?: string | null, workingDescription?: string | null, shoeSizeEu?: number | null, gender?: { __typename?: 'ProfileGender', value: Gender, label: string } | null, actorType?: { __typename?: 'ProfileActorType', value: ActorType, label: string } | null, actingGenders?: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> | null, attributes?: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> | null, builds?: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> | null, educations: Array<{ __typename?: 'ProfileEducation', id: string, schoolName: string, startDate: any, endDate?: any | null, description: string }>, ethnicity?: Array<{ __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string }> | null, hairColor?: { __typename?: 'ProfileHairColor', value: HairColor, label: string } | null, hairStyle?: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> | null, preferredRoleTypes?: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> | null, preferredProjectTypes?: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> | null, languages: Array<{ __typename?: 'ProfileLanguage', id: string, name: string, level: number, isoCode: string, description: string, dialects?: Array<string> | null }>, municipality?: { __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } } | null, municipalitiesOfInterest?: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> | null, residenceCountry?: { __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string } | null, skinColor?: { __typename?: 'ProfileSkinColor', value: SkinColor, label: string } | null, urls: Array<{ __typename?: 'ProfileUrl', id: string, name: string, url: string }>, attachments: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'LocalizedProfile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, dateOfBirth?: any | null, occupation?: string | null, attributesDescription?: string | null, childrenSizeCm?: number | null, clothingSizeLowerBody?: ClothingSize | null, clothingSizeUpperBody?: ClothingSize | null, coursesDescriptions?: Array<string> | null, experienceYears?: number | null, genderDescription?: string | null, hairDescription?: string | null, hairDyed?: boolean | null, heightCm?: number | null, knownForDescription?: string | null, memberOfActorUnion?: boolean | null, skills?: string | null, workingDescription?: string | null, shoeSizeEu?: number | null, gender?: { __typename?: 'ProfileGender', value: Gender, label: string } | null, actorType?: { __typename?: 'ProfileActorType', value: ActorType, label: string } | null, actingGenders?: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> | null, attributes?: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> | null, builds?: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> | null, educations: Array<{ __typename?: 'ProfileEducation', id: string, schoolName: string, startDate: any, endDate?: any | null, description: string }>, ethnicity?: Array<{ __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string }> | null, hairColor?: { __typename?: 'ProfileHairColor', value: HairColor, label: string } | null, hairStyle?: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> | null, preferredRoleTypes?: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> | null, preferredProjectTypes?: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> | null, languages: Array<{ __typename?: 'ProfileLanguage', id: string, name: string, level: number, isoCode: string, description: string, dialects?: Array<string> | null }>, municipality?: { __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } } | null, municipalitiesOfInterest?: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> | null, residenceCountry?: { __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string } | null, skinColor?: { __typename?: 'ProfileSkinColor', value: SkinColor, label: string } | null, urls: Array<{ __typename?: 'ProfileUrl', id: string, name: string, url: string }>, attachments: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } } };

export type DeleteProfileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProfileMutation = { __typename?: 'Mutation', deleteProfile: string };

export type CreateProfilePhotoAttachmentMutationVariables = Exact<{
  input: CreateProfilePhotoAttachmentInput;
}>;


export type CreateProfilePhotoAttachmentMutation = { __typename?: 'Mutation', createProfilePhotoAttachment: { __typename?: 'AttachmentUploadRequestDetails', url: string, id: string, headers: Array<{ __typename?: 'KeyValue', key: string, value: string }> } };

export type FinalizeProfilePhotoAttachmentMutationVariables = Exact<{
  input: FinalizeProfilePhotoAttachmentInput;
}>;


export type FinalizeProfilePhotoAttachmentMutation = { __typename?: 'Mutation', finalizeProfilePhotoAttachment: { __typename?: 'Attachment', id: string, contentType: string, title?: string | null, description?: string | null, filename?: string | null, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null } };

export type DeleteProfilePhotoAttachmentMutationVariables = Exact<{
  input: DeleteProfilePhotoAttachmentInput;
}>;


export type DeleteProfilePhotoAttachmentMutation = { __typename?: 'Mutation', deleteProfilePhotoAttachment: { __typename?: 'Attachment', id: string, contentType: string, title?: string | null, description?: string | null, filename?: string | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null } };

export type ProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'LocalizedProfile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, dateOfBirth?: any | null, occupation?: string | null, attributesDescription?: string | null, childrenSizeCm?: number | null, clothingSizeLowerBody?: ClothingSize | null, clothingSizeUpperBody?: ClothingSize | null, coursesDescriptions?: Array<string> | null, experienceYears?: number | null, genderDescription?: string | null, hairDescription?: string | null, hairDyed?: boolean | null, heightCm?: number | null, knownForDescription?: string | null, memberOfActorUnion?: boolean | null, skills?: string | null, workingDescription?: string | null, shoeSizeEu?: number | null, gender?: { __typename?: 'ProfileGender', value: Gender, label: string } | null, actorType?: { __typename?: 'ProfileActorType', value: ActorType, label: string } | null, actingGenders?: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> | null, attributes?: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> | null, builds?: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> | null, educations: Array<{ __typename?: 'ProfileEducation', id: string, schoolName: string, startDate: any, endDate?: any | null, description: string }>, ethnicity?: Array<{ __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string }> | null, hairColor?: { __typename?: 'ProfileHairColor', value: HairColor, label: string } | null, hairStyle?: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> | null, preferredRoleTypes?: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> | null, preferredProjectTypes?: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> | null, languages: Array<{ __typename?: 'ProfileLanguage', id: string, name: string, level: number, isoCode: string, description: string, dialects?: Array<string> | null }>, municipality?: { __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } } | null, municipalitiesOfInterest?: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> | null, residenceCountry?: { __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string } | null, skinColor?: { __typename?: 'ProfileSkinColor', value: SkinColor, label: string } | null, urls: Array<{ __typename?: 'ProfileUrl', id: string, name: string, url: string }>, attachments: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } } };

export type ProfileListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileListQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, profiles: { __typename?: 'PaginatedLocalizedProfiles', data: Array<{ __typename?: 'LocalizedProfile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, dateOfBirth?: any | null, occupation?: string | null, attributesDescription?: string | null, childrenSizeCm?: number | null, clothingSizeLowerBody?: ClothingSize | null, clothingSizeUpperBody?: ClothingSize | null, coursesDescriptions?: Array<string> | null, experienceYears?: number | null, genderDescription?: string | null, hairDescription?: string | null, hairDyed?: boolean | null, heightCm?: number | null, knownForDescription?: string | null, memberOfActorUnion?: boolean | null, skills?: string | null, workingDescription?: string | null, shoeSizeEu?: number | null, gender?: { __typename?: 'ProfileGender', value: Gender, label: string } | null, actorType?: { __typename?: 'ProfileActorType', value: ActorType, label: string } | null, actingGenders?: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> | null, attributes?: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> | null, builds?: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> | null, educations: Array<{ __typename?: 'ProfileEducation', id: string, schoolName: string, startDate: any, endDate?: any | null, description: string }>, ethnicity?: Array<{ __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string }> | null, hairColor?: { __typename?: 'ProfileHairColor', value: HairColor, label: string } | null, hairStyle?: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> | null, preferredRoleTypes?: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> | null, preferredProjectTypes?: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> | null, languages: Array<{ __typename?: 'ProfileLanguage', id: string, name: string, level: number, isoCode: string, description: string, dialects?: Array<string> | null }>, municipality?: { __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } } | null, municipalitiesOfInterest?: Array<{ __typename?: 'Municipality', id: number, name: string, region: { __typename?: 'MunicipalityRegion', id: number, name: string } }> | null, residenceCountry?: { __typename?: 'Country', id: string, countryCode: number, name: string, region: string, subRegion: string } | null, skinColor?: { __typename?: 'ProfileSkinColor', value: SkinColor, label: string } | null, urls: Array<{ __typename?: 'ProfileUrl', id: string, name: string, url: string }>, attachments: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } }> } } };

export type ProfilePhotosListQueryVariables = Exact<{
  input: ListProfilePhotoAttachmentInput;
}>;


export type ProfilePhotosListQuery = { __typename?: 'Query', profilePhotos: { __typename?: 'PaginatedAttachments', total: number, data: Array<{ __typename?: 'Attachment', id: string, filename?: string | null, title?: string | null, description?: string | null, contentType: string, purpose?: AttachmentPurpose | null, fileUrl?: { __typename?: 'FileUrl', originalUrl: string, variantUrl?: { __typename?: 'Variants', small?: string | null, medium?: string | null, large?: string | null } | null } | null }> } };

export type GendersQueryVariables = Exact<{ [key: string]: never; }>;


export type GendersQuery = { __typename?: 'Query', genders: Array<{ __typename?: 'ProfileGender', value: Gender, label: string }> };

export type ActorTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActorTypesQuery = { __typename?: 'Query', actorTypes: Array<{ __typename?: 'ProfileActorType', value: ActorType, label: string }> };

export type RoleTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type RoleTypesQuery = { __typename?: 'Query', roleTypes: Array<{ __typename?: 'RoleLocalType', value: RoleType, label: string }> };

export type ProjectTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectTypesQuery = { __typename?: 'Query', projectTypes: Array<{ __typename?: 'ProjectLocalType', value: ProjectType, label: string }> };

export type AttributesQueryVariables = Exact<{ [key: string]: never; }>;


export type AttributesQuery = { __typename?: 'Query', attributes: Array<{ __typename?: 'ProfileAttribute', value: Attribute, label: string }> };

export type BuildTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type BuildTypesQuery = { __typename?: 'Query', buildTypes: Array<{ __typename?: 'ProfileBuildType', value: BuildType, label: string }> };

export type HairStylesQueryVariables = Exact<{ [key: string]: never; }>;


export type HairStylesQuery = { __typename?: 'Query', hairStyles: Array<{ __typename?: 'ProfileHairStyle', value: HairStyle, label: string }> };

export type HairColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type HairColorsQuery = { __typename?: 'Query', hairColors: Array<{ __typename?: 'ProfileHairColor', value: HairColor, label: string }> };

export type SkinColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkinColorsQuery = { __typename?: 'Query', skinColors: Array<{ __typename?: 'ProfileSkinColor', value: SkinColor, label: string }> };

export type ClothingSizesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClothingSizesQuery = { __typename?: 'Query', clothingSizes: Array<{ __typename?: 'ProfileClothingSize', value: ClothingSize, label: string }> };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserResult', accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshUserTokens: { __typename?: 'LoginUserResult', accessToken: string, refreshToken: string } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserResult', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, phoneNumber: string } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName: string, lastName: string, phoneNumber: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string } };

export const AttachmentFragmentFragmentDoc = gql`
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
export const ProfileFragmentFragmentDoc = gql`
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
    ${AttachmentFragmentFragmentDoc}`;
export const CountriesDocument = gql`
    query Countries {
  countries {
    id
    name
  }
}
    `;

export function useCountriesQuery(options?: Omit<Urql.UseQueryArgs<CountriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CountriesQuery>({ query: CountriesDocument, ...options });
};
export const LanguagesDocument = gql`
    query Languages {
  languages {
    id
    name
  }
}
    `;

export function useLanguagesQuery(options?: Omit<Urql.UseQueryArgs<LanguagesQueryVariables>, 'query'>) {
  return Urql.useQuery<LanguagesQuery>({ query: LanguagesDocument, ...options });
};
export const MunicipalitiesDocument = gql`
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

export function useMunicipalitiesQuery(options?: Omit<Urql.UseQueryArgs<MunicipalitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<MunicipalitiesQuery>({ query: MunicipalitiesDocument, ...options });
};
export const CreateProfileDocument = gql`
    mutation CreateProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;

export function useCreateProfileMutation() {
  return Urql.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const DeleteProfileDocument = gql`
    mutation DeleteProfile($id: ID!) {
  deleteProfile(id: $id)
}
    `;

export function useDeleteProfileMutation() {
  return Urql.useMutation<DeleteProfileMutation, DeleteProfileMutationVariables>(DeleteProfileDocument);
};
export const CreateProfilePhotoAttachmentDocument = gql`
    mutation CreateProfilePhotoAttachment($input: CreateProfilePhotoAttachmentInput!) {
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

export function useCreateProfilePhotoAttachmentMutation() {
  return Urql.useMutation<CreateProfilePhotoAttachmentMutation, CreateProfilePhotoAttachmentMutationVariables>(CreateProfilePhotoAttachmentDocument);
};
export const FinalizeProfilePhotoAttachmentDocument = gql`
    mutation FinalizeProfilePhotoAttachment($input: FinalizeProfilePhotoAttachmentInput!) {
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

export function useFinalizeProfilePhotoAttachmentMutation() {
  return Urql.useMutation<FinalizeProfilePhotoAttachmentMutation, FinalizeProfilePhotoAttachmentMutationVariables>(FinalizeProfilePhotoAttachmentDocument);
};
export const DeleteProfilePhotoAttachmentDocument = gql`
    mutation DeleteProfilePhotoAttachment($input: DeleteProfilePhotoAttachmentInput!) {
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

export function useDeleteProfilePhotoAttachmentMutation() {
  return Urql.useMutation<DeleteProfilePhotoAttachmentMutation, DeleteProfilePhotoAttachmentMutationVariables>(DeleteProfilePhotoAttachmentDocument);
};
export const ProfileDocument = gql`
    query Profile($id: ID!) {
  profile(id: $id) {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
};
export const ProfileListDocument = gql`
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
    ${ProfileFragmentFragmentDoc}`;

export function useProfileListQuery(options?: Omit<Urql.UseQueryArgs<ProfileListQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileListQuery>({ query: ProfileListDocument, ...options });
};
export const ProfilePhotosListDocument = gql`
    query ProfilePhotosList($input: ListProfilePhotoAttachmentInput!) {
  profilePhotos(input: $input) {
    total
    data {
      ...AttachmentFragment
    }
  }
}
    ${AttachmentFragmentFragmentDoc}`;

export function useProfilePhotosListQuery(options: Omit<Urql.UseQueryArgs<ProfilePhotosListQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfilePhotosListQuery>({ query: ProfilePhotosListDocument, ...options });
};
export const GendersDocument = gql`
    query Genders {
  genders {
    value
    label
  }
}
    `;

export function useGendersQuery(options?: Omit<Urql.UseQueryArgs<GendersQueryVariables>, 'query'>) {
  return Urql.useQuery<GendersQuery>({ query: GendersDocument, ...options });
};
export const ActorTypesDocument = gql`
    query ActorTypes {
  actorTypes {
    value
    label
  }
}
    `;

export function useActorTypesQuery(options?: Omit<Urql.UseQueryArgs<ActorTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<ActorTypesQuery>({ query: ActorTypesDocument, ...options });
};
export const RoleTypesDocument = gql`
    query RoleTypes {
  roleTypes {
    value
    label
  }
}
    `;

export function useRoleTypesQuery(options?: Omit<Urql.UseQueryArgs<RoleTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<RoleTypesQuery>({ query: RoleTypesDocument, ...options });
};
export const ProjectTypesDocument = gql`
    query ProjectTypes {
  projectTypes {
    value
    label
  }
}
    `;

export function useProjectTypesQuery(options?: Omit<Urql.UseQueryArgs<ProjectTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectTypesQuery>({ query: ProjectTypesDocument, ...options });
};
export const AttributesDocument = gql`
    query Attributes {
  attributes {
    value
    label
  }
}
    `;

export function useAttributesQuery(options?: Omit<Urql.UseQueryArgs<AttributesQueryVariables>, 'query'>) {
  return Urql.useQuery<AttributesQuery>({ query: AttributesDocument, ...options });
};
export const BuildTypesDocument = gql`
    query BuildTypes {
  buildTypes {
    value
    label
  }
}
    `;

export function useBuildTypesQuery(options?: Omit<Urql.UseQueryArgs<BuildTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<BuildTypesQuery>({ query: BuildTypesDocument, ...options });
};
export const HairStylesDocument = gql`
    query HairStyles {
  hairStyles {
    value
    label
  }
}
    `;

export function useHairStylesQuery(options?: Omit<Urql.UseQueryArgs<HairStylesQueryVariables>, 'query'>) {
  return Urql.useQuery<HairStylesQuery>({ query: HairStylesDocument, ...options });
};
export const HairColorsDocument = gql`
    query HairColors {
  hairColors {
    value
    label
  }
}
    `;

export function useHairColorsQuery(options?: Omit<Urql.UseQueryArgs<HairColorsQueryVariables>, 'query'>) {
  return Urql.useQuery<HairColorsQuery>({ query: HairColorsDocument, ...options });
};
export const SkinColorsDocument = gql`
    query SkinColors {
  skinColors {
    value
    label
  }
}
    `;

export function useSkinColorsQuery(options?: Omit<Urql.UseQueryArgs<SkinColorsQueryVariables>, 'query'>) {
  return Urql.useQuery<SkinColorsQuery>({ query: SkinColorsDocument, ...options });
};
export const ClothingSizesDocument = gql`
    query ClothingSizes {
  clothingSizes {
    value
    label
  }
}
    `;

export function useClothingSizesQuery(options?: Omit<Urql.UseQueryArgs<ClothingSizesQueryVariables>, 'query'>) {
  return Urql.useQuery<ClothingSizesQuery>({ query: ClothingSizesDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($input: LoginUserInput!) {
  loginUser(input: $input) {
    accessToken
    refreshToken
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  refreshUserTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
};
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    user {
      id
      email
      firstName
      lastName
      phoneNumber
    }
    accessToken
    refreshToken
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    firstName
    lastName
    phoneNumber
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const CurrentUserDocument = gql`
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

export function useCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};