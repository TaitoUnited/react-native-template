import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { styled } from '~styles';

type Props = {
  step: number;
  totalSteps: number;
  height?: number;
  animated?: boolean;
};

/**
 * Renders a progress bar for a multi-step form.
 *
 * @param {Object} props - The component props.
 * @param {number} props.step - The current step of the form.
 * @param {number} props.totalSteps - The total number of steps in the form.
 * @param {number} [props.height=12] - The height of the progress bar.
 * @param {boolean} [props.animated=false] - Whether the progress bar should animate.
 * @returns {JSX.Element} - The rendered component.
 */
export function ProgressBar({
  step,
  totalSteps,
  height = 12,
  animated = true,
}: Props): JSX.Element {
  const progress = Math.min(Math.max((step / totalSteps) * 100, 0), 100);

  const progressAnim = useSharedValue(0);

  useDerivedValue(() => {
    progressAnim.value = withTiming(progress, {
      duration: animated ? 200 : 0,
    });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnim.value}%`,
    };
  });

  return (
    <ProgressContainer
      style={{ height }}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ now: step, min: 0, max: totalSteps }}
    >
      <AnimatedProgress style={[{ height }, animatedStyle]} />
    </ProgressContainer>
  );
}

const ProgressContainer = styled('View', {
  borderRadius: '$full',
  backgroundColor: '$primaryMutedHover',
});

const Progress = styled('View', {
  borderRadius: '$full',
  backgroundColor: '$primary',
});

const AnimatedProgress = Animated.createAnimatedComponent(Progress);
