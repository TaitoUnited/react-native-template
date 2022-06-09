import { useState } from 'react';
import { t } from '@lingui/macro';

import type { ProfilePhase, ProfilePhaseItems } from './types';

import {
  useCountriesQuery,
  useLanguagesQuery,
  useMunicipalitiesQuery,
  useGendersQuery,
  useSkinColorsQuery,
  useHairColorsQuery,
  useHairStylesQuery,
  useClothingSizesQuery,
  useBuildTypesQuery,
  useAttributesQuery,
  useActorTypesQuery,
  useRoleTypesQuery,
  useProjectTypesQuery,
} from '~graphql/generated';

const phases: ProfilePhaseItems = [
  { id: 'basic-info', title: t`Basic info`, isRequired: true },
  { id: 'casting-images', title: t`Casting images`, isRequired: true },
  { id: 'languages', title: t`Languages`, isRequired: false },
  { id: 'appearance', title: t`Appearance`, isRequired: false },
  { id: 'education', title: t`Education`, isRequired: false },
  { id: 'courses', title: t`Courses`, isRequired: false },
  { id: 'acting-skills', title: t`Acting skills`, isRequired: false },
  { id: 'portfolio', title: t`Portfolio`, isRequired: false },
];

export function getPhase(position: number): ProfilePhase {
  return phases[position].id;
}

export function getPhaseIndex(phase: ProfilePhase): number {
  return phases.findIndex((p) => p.id === phase);
}

export function getNextPhase(phase: ProfilePhase): ProfilePhase {
  const index = getPhaseIndex(phase);
  return phases[index + 1].id;
}

export function getPreviousPhase(phase: ProfilePhase): ProfilePhase {
  const index = getPhaseIndex(phase);
  return phases[index - 1].id;
}

export function useProfilePhases() {
  const [currentPhase, setCurrentPhase] = useState<ProfilePhase>('basic-info');

  return { phases, currentPhase, setCurrentPhase };
}

export function useDatasets() {
  const [{ data: countriesData }] = useCountriesQuery();
  const [{ data: municipalitiesData }] = useMunicipalitiesQuery();
  const [{ data: languagesData }] = useLanguagesQuery();

  return {
    countries: countriesData?.countries ?? [],
    municipalities: municipalitiesData?.municipalities ?? [],
    languages: languagesData?.languages ?? [],
  };
}

export function useActingSkillsOptions() {
  const [{ data: actorTypes }] = useActorTypesQuery();

  return {
    actorTypes: actorTypes?.actorTypes ?? [],
  };
}

export function useProfilePreferencesOptions() {
  const [{ data: roleTypes }] = useRoleTypesQuery();
  const [{ data: projectTypes }] = useProjectTypesQuery();

  return {
    roleTypes: roleTypes?.roleTypes ?? [],
    projectTypes: projectTypes?.projectTypes ?? [],
  };
}

export function useAppearanceOptions() {
  const [{ data: genders }] = useGendersQuery();

  const [{ data: skinColors }] = useSkinColorsQuery();

  const [{ data: hairColors }] = useHairColorsQuery();

  const [{ data: hairStyles }] = useHairStylesQuery();

  const [{ data: clothingSizes }] = useClothingSizesQuery();

  const [{ data: buildTypes }] = useBuildTypesQuery();

  const [{ data: attributes }] = useAttributesQuery();

  return {
    genders: genders?.genders ?? [],
    skinColors: skinColors?.skinColors ?? [],
    hairColors: hairColors?.hairColors ?? [],
    hairStyles: hairStyles?.hairStyles ?? [],
    clothingSizes: clothingSizes?.clothingSizes ?? [],
    buildTypes: buildTypes?.buildTypes ?? [],
    attributes: attributes?.attributes ?? [],
  };
}
