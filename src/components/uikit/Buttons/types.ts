import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { IconName } from '../Icon';

export type ButtonSize = 'small' | 'medium' | 'large';

// Add more variants if needed, eg. success, error, warning, etc.
export type ButtonVariant = 'primary' | 'danger';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: IconName;
  iconPlacement?: 'start' | 'end';
  loading?: boolean;
  onPress: () => void;
};
