import { useEffect, type JSX } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

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

  useEffect(() => {
    progressAnim.value = withTiming(progress, {
      duration: animated ? 200 : 0,
    });
  }, [animated, progress, progressAnim, step]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnim.value}%`,
    };
  });

  return (
    <View
      style={[styles.progressContainer, { height }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ now: step, min: 0, max: totalSteps }}
    >
      <Animated.View style={[styles.progress, { height }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  progressContainer: {
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primaryMutedHover,
  },
  progress: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.full,
  },
}));
