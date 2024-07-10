import { StyleProp, ViewStyle } from 'react-native';

import { Color, useTheme } from '~styles';

import { ButtonProps, ButtonSize, IconButtonProps } from './types';

/** Get the base style for a button or icon button */
const getBaseStyle = ({
  theme,
  variant = 'filled',
  color = 'primary',
  disabled = false,
}: Pick<ButtonProps, 'variant' | 'color' | 'disabled'> & {
  theme: ReturnType<typeof useTheme>;
}): ViewStyle => {
  const baseStyle: ViewStyle = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
  };

  if (disabled) {
    switch (variant) {
      case 'filled':
        baseStyle.backgroundColor = theme.colors.neutral4;
        break;
      case 'soft':
        baseStyle.backgroundColor = theme.colors.neutral5;
        break;
      case 'outlined':
        baseStyle.borderColor = theme.colors.line2;
        break;
      case 'plain':
        // baseStyle remains as is
        break;

      default:
        break;
    }
    return baseStyle;
  }

  switch (variant) {
    case 'filled':
      baseStyle.backgroundColor = theme.colors[color];
      break;
    case 'soft':
      // eslint-disable-next-line lingui/no-unlocalized-strings
      baseStyle.backgroundColor = theme.colors[`${color}Muted`];
      break;
    case 'outlined':
      baseStyle.borderColor = theme.colors[color];
      break;
    case 'plain':
      // baseStyle remains as is
      break;
  }

  return baseStyle;
};

/** Get the color for text or icon based on the button properties */
const getColor = ({
  variant,
  color = 'primary',
  disabled,
}: Pick<ButtonProps, 'variant' | 'disabled'> & {
  color?: ButtonProps['color'] | 'neutral';
}): Color => {
  if (disabled) {
    return 'textMuted';
  }

  if (color === 'neutral') {
    return 'text';
  }

  switch (variant) {
    case 'filled':
      return 'textOnContrastingBg';
    case 'soft':
    case 'outlined':
    case 'plain':
      // eslint-disable-next-line lingui/no-unlocalized-strings
      return color === 'primary' ? color : `${color}Contrast`;
    default:
      return 'textOnContrastingBg';
  }
};

/** Get the wrapper style for a button */
export const getButtonWrapperStyle = ({
  theme,
  variant = 'filled',
  color = 'primary',
  disabled = false,
}: Pick<ButtonProps, 'variant' | 'color' | 'disabled'> & {
  theme: ReturnType<typeof useTheme>;
}): StyleProp<ViewStyle> => {
  return getBaseStyle({ variant, color, disabled, theme });
};

/** Get the wrapper style for an icon button */
export const getIconWrapperStyle = ({
  theme,
  variant = 'filled',
  color = 'primary',
  disabled = false,
}: Pick<IconButtonProps, 'variant' | 'color' | 'disabled'> & {
  theme: ReturnType<typeof useTheme>;
}): StyleProp<ViewStyle> => {
  if (color === 'neutral') {
    return { backgroundColor: 'transparent' };
  }
  return getBaseStyle({ variant, color, disabled, theme });
};

/** Get the text color for a button */
export const getTextColor = ({
  variant = 'filled',
  color = 'primary',
  disabled = false,
}: Pick<ButtonProps, 'variant' | 'color' | 'disabled'>): Color => {
  return getColor({ variant, color, disabled });
};

/** Get the icon color for an icon button */
export const getIconColor = ({
  variant = 'filled',
  color = 'primary',
  disabled = false,
}: Pick<IconButtonProps, 'variant' | 'color' | 'disabled'>): Color => {
  return getColor({ variant, color, disabled });
};

/** Map button sizes to icon sizes */
export const sizeToIconSize: Record<ButtonSize, number> = {
  small: 14,
  normal: 18,
  large: 22,
};
