import { View } from 'react-native';

import { styled } from '~styles';

type Props = {
  step: number;
  totalSteps: number;
  height?: number;
};

/**
 * Renders a progress bar for a multi-step form.
 *
 * @param {Object} props - The component props.
 * @param {number} props.step - The current step of the form.
 * @param {number} props.totalSteps - The total number of steps in the form.
 * @returns {JSX.Element} - The rendered component.
 */
export function ProgressBar({
  step,
  totalSteps,
  height = 12,
}: Props): JSX.Element {
  let progress = (step / totalSteps) * 100;
  if (progress > 100) {
    progress = 100;
  } else if (progress < 0) {
    progress = 0;
  }

  if (step === 0) {
    return <View />;
  }

  return (
    <ProgressContainer style={{ height }}>
      <Progress style={{ height, width: `${progress}%` }} />
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
