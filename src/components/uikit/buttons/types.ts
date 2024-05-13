import type { ReactNode } from 'react';
import type { TouchableWithoutFeedbackProps } from 'react-native';

import type { IconName } from '../Icon';

export type ButtonSize = 'small' | 'medium' | 'large';

// Add more variants if needed, eg. success, error, warning, etc.
export type ButtonVariant = 'primary' | 'danger' | 'warn' | 'info' | 'neutral';

export type ButtonProps = TouchableWithoutFeedbackProps & {
  children: ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconSide?: 'start' | 'end';
  iconPosition?: 'label' | 'edge';
  loading?: boolean;
};
