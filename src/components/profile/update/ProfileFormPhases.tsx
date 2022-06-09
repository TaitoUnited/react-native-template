import { useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { LayoutRectangle, ScrollView } from 'react-native';
import { Trans } from '@lingui/macro';
import { PROFILE_PHASE_FIELDS } from './constants';
import type {
  ProfileForm,
  ProfileFormValues,
  ProfilePhase,
  ProfilePhaseItems,
} from './types';
import { Icon, Stack, Text } from '~components/uikit';
import { styled, useTheme } from '~styles/styled';

type Props = {
  phases: ProfilePhaseItems;
  currentPhase: ProfilePhase;
  form: ProfileForm;
  onPhaseChange: (phase: ProfilePhase) => void;
};

export default function ProfileFormPhases({
  form,
  phases,
  currentPhase,
  onPhaseChange,
}: Props) {
  const theme = useTheme();
  const phasesMeasurement = useRef({} as Record<ProfilePhase, LayoutRectangle>);
  const scrollRef = useRef<ScrollView>(null);

  const onPhaseLayout = (phase: ProfilePhase, layout: LayoutRectangle) => {
    phasesMeasurement.current = {
      ...phasesMeasurement.current,
      [phase]: layout,
    };
  };

  useEffect(() => {
    const measurement = phasesMeasurement.current[currentPhase];
    if (measurement)
      scrollRef.current?.scrollTo({
        x: measurement.x,
      });
  }, [currentPhase]);

  return (
    <Stack
      axis="y"
      spacing="none"
      align="center"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        paddingTop: theme.space.xsmall,
      }}
    >
      <Stack axis="x" spacing="xxsmall">
        <Text variant="caption" color="textMuted">
          <Trans>Required</Trans>
        </Text>

        <Text variant="bodyBold" color="error">
          *
        </Text>
      </Stack>

      <PhasesWrapper
        horizontal
        showsHorizontalScrollIndicator={false}
        {...({ ref: scrollRef } as any)}
      >
        <PhaseLine />

        <Stack axis="x" spacing="medium">
          {phases.map(({ id, title, isRequired }, i) => (
            <ProfileFormPhase
              onPhaseLayout={onPhaseLayout}
              key={id}
              form={form}
              id={id}
              title={`${i + 1}. ${title}`}
              currentPhase={currentPhase}
              isRequired={isRequired}
              onPress={() => onPhaseChange(id)}
            />
          ))}
        </Stack>
      </PhasesWrapper>
    </Stack>
  );
}

type FieldNames = Array<keyof ProfileFormValues>;

function ProfileFormPhase({
  id,
  title,
  form,
  currentPhase,
  isRequired,
  onPress,
  onPhaseLayout,
}: {
  id: ProfilePhase;
  title: string;
  form: Props['form'];
  currentPhase: ProfilePhase;
  isRequired: boolean;
  onPress: () => void;
  onPhaseLayout: (phase: ProfilePhase, layout: LayoutRectangle) => void;
}) {
  const isActive = currentPhase === id;
  const fields = Object.keys(PROFILE_PHASE_FIELDS[id]) as FieldNames;
  const values = useWatch({ control: form.control, name: fields });
  const isComplete = values.length > 0 && values.every((v) => v !== null);

  return (
    <PhaseButton
      onPress={onPress}
      isActive={isActive}
      onLayout={(e) => onPhaseLayout(id, e.nativeEvent.layout)}
    >
      <>
        <Stack axis="y" spacing="xxsmall" align="center">
          <PhaseStatusIndicator isComplete={isComplete} isActive={isActive}>
            {isComplete && (
              <Icon name="checkmark" color="primaryText" size={12} />
            )}
          </PhaseStatusIndicator>

          <Text variant="caption" color={isActive ? 'text' : 'textMuted'}>
            {title}
          </Text>
        </Stack>

        {isRequired && <PhaseAsterisk>*</PhaseAsterisk>}
      </>
    </PhaseButton>
  );
}

const PhasesWrapper = styled('ScrollView', {}).attrs((p) => ({
  contentContainerStyle: {
    paddingHorizontal: p.theme.space.normal,
  },
}));

const PhaseButton = styled('TouchableHighlight', {
  zIndex: 100,
  backgroundColor: '$background',
  paddingVertical: '$xsmall',
  paddingHorizontal: '$small',
  borderRadius: '$normal',
  borderWidth: 1,
  variants: {
    isActive: {
      true: { borderColor: '$primary', backgroundColor: '$muted6' },
      false: { borderColor: '$muted4' },
    },
  },
}).attrs((p) => ({
  underlayColor: p.theme.colors.muted5,
}));

const PhaseStatusIndicator = styled('View', {
  width: 16,
  height: 16,
  borderWidth: 2,
  borderRadius: '$full',
  flexCenter: 'row',
  variants: {
    isComplete: {
      true: { backgroundColor: '$primary' },
      false: { backgroundColor: 'transparent' },
    },
    isActive: {
      true: { borderColor: '$text' },
      false: { borderColor: '$textMuted' },
    },
  },
});

const PhaseLine = styled('View', {
  position: 'absolute',
  zIndex: 0,
  left: '$normal',
  right: '$normal',
  top: '50%',
  height: 1,
  backgroundColor: '$muted2',
});

const PhaseAsterisk = styled('Text', {
  position: 'absolute',
  top: 0,
  right: 4,
  color: '$error',
  typography: '$title3',
});
