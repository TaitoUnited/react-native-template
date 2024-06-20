import type { ReactNode } from 'react';
import type {
  PressableProps,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import type { IconName } from '../Icon';

export type ButtonSize = 'small' | 'normal' | 'large';

export type ButtonColor = 'primary' | 'success' | 'error';

export type ButtonVariant = 'filled' | 'soft' | 'outlined' | 'plain';

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

export type ButtonProps = TouchableWithoutFeedbackProps &
  ButtonOwnProps & {
    color?: ButtonColor;
    children: ReactNode;
    icon?: IconName;
    iconPlacement?: 'start' | 'end';
  };

export type IconButtonProps = PressableProps &
  ButtonOwnProps & {
    icon: IconName;
    color?: ButtonColor | 'neutral';
  };
