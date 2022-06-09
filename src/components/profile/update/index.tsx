import React, { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Trans } from '@lingui/macro';
import { FillButton, OutlineButton, Spacer, Stack } from '../../uikit';
import ActingSkillsForm from './ActingSkillsForm';
import AppearanceForm from './AppearanceForm';
import BasicInfoForm from './BasicInfoForm';
import CastingImagesForm from './CastingImagesForm';
import CoursesForm from './CoursesForm';
import EducationsForm from './EducationsForm';
import { useProfileForm } from './form';
import {
  getNextPhase,
  getPhase,
  getPhaseIndex,
  getPreviousPhase,
  useDatasets,
  useProfilePhases,
} from './hooks';
import LanguagesForm from './LanguagesForm';
import PortfolioForm from './PortfolioForm';
import { useProfileFormHeader } from './ProfileFormHeader';
import ProfileFormPhases from './ProfileFormPhases';
import { ProfilePhase } from './types';
import { styled } from '~styles';
import type { LocalizedProfile } from '~graphql/generated';

type Props = {
  profile: Omit<LocalizedProfile, 'user'>;
};

const PHASES_HEIGHT = 60;

export default function ProfileUpdate({ profile }: Props) {
  const insets = useSafeAreaInsets();
  const datasets = useDatasets();
  const pagerViewRef = useRef<PagerView>(null);

  const { attachments, id, ...cleanedProfile } = profile;
  const { form, languages, educations, urls, courses } = useProfileForm({id, ...cleanedProfile}); // prettier-ignore
  const { phases, currentPhase, setCurrentPhase } = useProfilePhases();

  const chagePhaseNumber = (phaseNumber: number) => {
    const phase = getPhase(phaseNumber);
    setCurrentPhase(phase);
  };

  const [hasChildrenSize, setHasChildrenSize] = useState(
    !!cleanedProfile.childrenSizeCm,
  );

  useProfileFormHeader({
    phases,
    currentPhase,
    form,
    profileId: id,
  });

  const onPhaseChange = (phase: ProfilePhase, animation = false) => {
    if (animation) {
      pagerViewRef.current?.setPage(getPhaseIndex(phase));
    } else {
      pagerViewRef.current?.setPageWithoutAnimation(getPhaseIndex(phase));
    }
    setCurrentPhase(phase);
  };

  const goNext = () => {
    const nextPhase = getNextPhase(currentPhase);
    onPhaseChange(nextPhase, true);
  };
  const goPrevious = () => {
    const prevPhase = getPreviousPhase(currentPhase);
    onPhaseChange(prevPhase, true);
  };

  return (
    <Wrapper
      style={{ paddingTop: PHASES_HEIGHT, paddingBottom: insets.bottom }}
    >
      <ProfileFormPhases
        form={form}
        phases={phases}
        currentPhase={currentPhase}
        onPhaseChange={onPhaseChange}
      />

      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        onPageSelected={(e) => {
          chagePhaseNumber(e.nativeEvent.position);
        }}
      >
        <Scroller>
          <BasicInfoForm
            form={form}
            countries={datasets.countries}
            municipalities={datasets.municipalities}
          />
          <FormFooter goNext={goNext} />
        </Scroller>
        <Scroller>
          <CastingImagesForm attachments={attachments} profileId={id} />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <LanguagesForm
            form={form}
            languageFields={languages}
            languages={datasets.languages}
          />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <AppearanceForm
            form={form}
            countries={datasets.countries}
            hasChildrenSize={hasChildrenSize}
            onHasChildrenSizeChange={() => setHasChildrenSize(!hasChildrenSize)}
          />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <EducationsForm form={form} eductionFields={educations} />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <CoursesForm form={form} coursesFields={courses} />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <ActingSkillsForm form={form} />
          <FormFooter goPrevious={goPrevious} goNext={goNext} />
        </Scroller>
        <Scroller>
          <PortfolioForm form={form} urlFields={urls} />
          <FormFooter goPrevious={goPrevious} />
        </Scroller>
      </PagerView>
    </Wrapper>
  );
}

function FormFooter({
  goPrevious,
  goNext,
}: {
  goPrevious?: () => void;
  goNext?: () => void;
}) {
  // Add cooldown to prevent double taps
  const [isCooldown, setIsCooldown] = useState(false);

  const applyCooldown = () => {
    setIsCooldown(true);
    setTimeout(() => {
      setIsCooldown(false);
    }, 400);
  };

  const onGoPrevious = () => {
    if (isCooldown) return;
    applyCooldown();
    goPrevious?.();
  };

  const onGoNext = () => {
    if (isCooldown) return;
    applyCooldown();
    goNext?.();
  };

  return (
    <FormFooterWrapper spacing="medium" axis="x" justify="between">
      {goPrevious && (
        <OutlineButton
          variant="primary"
          size="medium"
          icon="arrowLeft"
          iconPlacement="left"
          style={{ alignSelf: 'center' }}
          onPress={onGoPrevious}
        >
          <Trans>Previous</Trans>
        </OutlineButton>
      )}
      <Spacer />
      {goNext && (
        <FillButton
          variant="primary"
          size="medium"
          icon="arrowRight"
          iconPlacement="right"
          style={{ alignSelf: 'center' }}
          onPress={onGoNext}
        >
          <Trans>Next</Trans>
        </FillButton>
      )}
    </FormFooterWrapper>
  );
}

const FormFooterWrapper = styled(Stack, {
  marginBottom: '$small',
  marginTop: '$large',
});

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

const Scroller = styled(KeyboardAwareScrollView, {
  flex: 1,
}).attrs((p) => ({
  // Tapping outside will just close keyboard and not focus another input
  keyboardShouldPersistTaps: 'never',
  contentContainerStyle: {
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: p.theme.space.normal,
  },
}));
