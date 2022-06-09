import type { ViewStyle } from 'react-native';
import type { IconName } from '../Icon';

// Add more variants if needed, eg. success, error, warning, etc.
export type ButtonVariant = 'primary' | 'danger';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: IconName;
  iconPlacement?: 'right' | 'left';
  loading?: boolean;
  onPress?: () => void;
};

export type IconButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  icon: IconName;
  loading?: boolean;
  onPress: () => void;
};
