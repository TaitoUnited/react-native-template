import { useFieldArray, useForm } from 'react-hook-form';

import type { ProfileFormValues } from './types';
import type { LocalizedProfile, UpdateProfileInput } from '~graphql/generated';
import { nullifyFields } from '~utils/common';

const knownUrls = [
  'facebook',
  'tiktok',
  'twitter',
  'imdb',
  'linkedin',
  'showreel',
];

export function useProfileForm(
  profile: Omit<LocalizedProfile, 'user' | 'attachments'>,
) {
  const { __typename, id, municipality, ...currentProfile } = profile; // eslint-disable-line
  const currentValues = nullifyFields(currentProfile); // replace undefined with null
  const profileUrls = currentProfile.urls || [];

  // For educations and languages provide empty placeholder so that the user
  // doesn't need to press "Add new" button but can start filling in the details
  // straight away for the first item.
  const emptyEducation = {
    description: '',
    schoolName: '',
    startDate: new Date(),
    endDate: undefined,
  };

  const emptyLanguage = {
    description: '',
    isoCode: '',
    level: 3,
  };

  const emptyCourse = {
    description: '',
  };

  const defaultValues: ProfileFormValues = {
    ...currentValues,
    // --- OVERRIDES TO SUIT THE FORM BETTER ---
    // Basic Info
    dateOfBirth: currentProfile.dateOfBirth
      ? new Date(currentProfile.dateOfBirth)
      : null,
    residenceCountry: currentProfile.residenceCountry
      ? currentProfile.residenceCountry.id.toString()
      : null,
    municipalityCode: municipality ? municipality.id.toString() : null,
    municipalitiesOfInterest: currentProfile.municipalitiesOfInterest
      ? currentProfile.municipalitiesOfInterest.map((m) => m.id.toString())
      : null,
    preferredRoleTypes: currentProfile.preferredRoleTypes
      ? currentProfile.preferredRoleTypes.map((r) => r.value)
      : null,
    preferredProjectTypes: currentProfile.preferredProjectTypes
      ? currentProfile.preferredProjectTypes.map((p) => p.value)
      : null,

    // Languages
    languages:
      currentProfile.languages.length > 0
        ? currentProfile.languages.map((l) => ({
            description: l.description,
            isoCode: l.isoCode,
            level: l.level,
          }))
        : [emptyLanguage],

    // Appearance
    gender: currentProfile.gender ? currentProfile.gender.value : null,
    actingGenders: currentProfile.actingGenders
      ? currentProfile.actingGenders.map((g) => g.value)
      : null,
    hairColor: currentProfile.hairColor ? currentProfile.hairColor.value : null,
    hairStyle: currentProfile.hairStyle
      ? currentProfile.hairStyle.map((s) => s.value)
      : null,
    heightCm: currentProfile.heightCm
      ? currentProfile.heightCm.toString()
      : null,
    skinColor: currentProfile.skinColor ? currentProfile.skinColor.value : null,
    shoeSizeEu: currentProfile.shoeSizeEu
      ? currentProfile.shoeSizeEu.toString()
      : null,
    attributes: currentProfile.attributes
      ? currentProfile.attributes.map((a) => a.value)
      : null,
    ethnicity: currentProfile.ethnicity
      ? currentProfile.ethnicity.map((e) => e.id.toString())
      : null,
    builds: currentProfile.builds
      ? currentProfile.builds.map((b) => b.value)
      : null,
    childrenSizeCm: currentProfile.childrenSizeCm
      ? currentProfile.childrenSizeCm.toString()
      : null,

    // Acting skills
    actorType: currentProfile.actorType ? currentProfile.actorType.value : null,
    experienceYears: currentProfile.experienceYears
      ? currentProfile.experienceYears.toString()
      : null,
    coursesDescriptions: currentProfile.coursesDescriptions
      ? currentProfile.coursesDescriptions.map((c) => ({ description: c }))
      : [emptyCourse],

    // Education
    educations:
      currentProfile.educations.length > 0
        ? currentProfile.educations.map((e) => ({
            description: e.description,
            schoolName: e.schoolName,
            startDate: new Date(e.startDate),
            endDate: e.endDate ? new Date(e.endDate) : undefined,
          }))
        : [emptyEducation],

    // Portfolio
    facebook:
      profileUrls.find((u) => u.name.toLowerCase() === 'facebook')?.url || null,
    tiktok:
      profileUrls.find((u) => u.name.toLowerCase() === 'tiktok')?.url || null,
    twitter:
      profileUrls.find((u) => u.name.toLowerCase() === 'twitter')?.url || null,
    imdb: profileUrls.find((u) => u.name.toLowerCase() === 'imdb')?.url || null,
    linkedin:
      profileUrls.find((u) => u.name.toLowerCase() === 'linkedin')?.url || null,
    showreel:
      profileUrls.find((u) => u.name.toLowerCase() === 'showreel')?.url || null,
    urls:
      profileUrls.length > 0
        ? profileUrls
            .filter((u) => !knownUrls.includes(u.name.toLowerCase()))
            .map((u) => ({ name: u.name, url: u.url }))
        : [],
  };

  const form = useForm<ProfileFormValues>({
    mode: 'onBlur',
    shouldUnregister: false,
    defaultValues,
  });

  const languages = useFieldArray({
    control: form.control,
    name: 'languages',
    shouldUnregister: false,
  });

  const educations = useFieldArray({
    control: form.control,
    name: 'educations',
    shouldUnregister: false,
  });

  const urls = useFieldArray({
    control: form.control,
    name: 'urls',
    shouldUnregister: false,
  });

  const courses = useFieldArray({
    control: form.control,
    name: 'coursesDescriptions',
    shouldUnregister: false,
  });

  return { form, languages, educations, urls, courses };
}

export function processFormValues(values: ProfileFormValues) {
  const {
    dateOfBirth,
    facebook,
    tiktok,
    twitter,
    imdb,
    linkedin,
    showreel,
    ...profile
  } = values;

  const coursesDescriptions = profile.coursesDescriptions
    .filter((c) => !!c.description)
    .map((c) => c.description);

  const urls = [
    !!facebook && { name: 'Facebook', url: facebook },
    !!tiktok && { name: 'TikTok', url: tiktok },
    !!twitter && { name: 'Twitter', url: twitter },
    !!imdb && { name: 'IMDB', url: imdb },
    !!linkedin && { name: 'LinkedIn', url: linkedin },
    !!showreel && { name: 'Showreel', url: showreel },
    ...(profile.urls || []),
  ].filter((u) => u && u.url) as NonNullable<UpdateProfileInput['urls']>;

  const languages = profile.languages
    .filter((l) => !!l.isoCode)
    .map((l) => ({
      description: l.description,
      isoCode: l.isoCode,
      level: l.level,
    }));

  const educations = profile.educations
    .filter((e) => !!e.schoolName && !!e.startDate)
    .map((e) => ({
      description: e.description,
      schoolName: e.schoolName,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate?.toISOString(),
    }));

  const processed: Omit<UpdateProfileInput, 'id'> = {
    ...profile,
    email: profile?.email?.length ? profile.email : null,
    clothingSizeUpperBody: profile.clothingSizeUpperBody
      ? profile.clothingSizeUpperBody
      : null,
    clothingSizeLowerBody: profile.clothingSizeLowerBody
      ? profile.clothingSizeLowerBody
      : null,
    childrenSizeCm: profile.childrenSizeCm
      ? parseInt(profile.childrenSizeCm, 10)
      : null,
    residenceCountry: profile.residenceCountry
      ? profile.residenceCountry
      : null,
    dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
    municipalityCode: profile.municipalityCode
      ? parseInt(profile.municipalityCode, 10)
      : null,
    municipalitiesOfInterest: profile.municipalitiesOfInterest
      ? profile.municipalitiesOfInterest.map((m) => parseInt(m, 10))
      : null,
    heightCm: values.heightCm ? parseInt(values.heightCm, 10) : null,
    shoeSizeEu: values.shoeSizeEu ? parseInt(values.shoeSizeEu, 10) : null,
    experienceYears: values.experienceYears
      ? parseInt(values.experienceYears, 10)
      : null,
    coursesDescriptions:
      coursesDescriptions.length > 0 ? coursesDescriptions : null,
    languages: languages.length > 0 ? languages : null,
    educations: educations.length > 0 ? educations : null,
    urls: urls.length > 0 ? urls : null,
  };

  return processed;
}
