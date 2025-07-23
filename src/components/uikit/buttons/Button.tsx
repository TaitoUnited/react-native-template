import {
  ActivityIndicator,
  TouchableOpacity,
  type GestureResponderEvent,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { type Typography } from '~styles/styled';
import { haptics } from '~utils/haptics';

import { Icon } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import { getButtonWrapperStyle, getTextColor, sizeToIconSize } from './helpers';
import { type ButtonProps, type ButtonSize } from './types';

export function Button({
  children,
  color = 'primary',
  icon,
  iconPlacement = 'end',
  loading,
  disabled,
  size = 'normal',
  style,
  variant = 'filled',
  onPress,
  accessibilityRole,
  ...rest
}: ButtonProps) {
  const { theme } = useUnistyles();
  const textVariant = sizeToTextVariant[size];
  const iconSize = sizeToIconSize[size];

  const wrapperStyle = getButtonWrapperStyle({
    theme,
    variant,
    color,
    disabled,
  });

  const textColor = getTextColor({ variant, color, disabled });

  const iconComp = icon && (
    <Icon name={icon} color={textColor} size={iconSize} />
  );

  function _onPress(e: GestureResponderEvent) {
    if (!disabled && onPress) {
      haptics.selection();
      onPress(e);
    }
  }

  styles.useVariants({
    size,
    disabled,
  });

  return (
    <TouchableOpacity
      style={[styles.wrapper, wrapperStyle, style]}
      onPress={_onPress}
      activeOpacity={disabled ? 0.9 : 0.8}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{ disabled, busy: loading }}
      {...rest}
    >
      <Stack
        axis="x"
        align="center"
        justify="center"
        style={{ flexGrow: 1 }}
        spacing={size === 'large' ? 'small' : 'xs'}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors[textColor]} size="small" />
        ) : (
          <>
            {icon && iconPlacement === 'start' && iconComp}
            <Text
              variant={textVariant}
              style={{
                color: theme.colors[textColor],
                lineHeight: sizeToLineHeight[size],
                flexShrink: 1,
              }}
              numberOfLines={size === 'large' ? 2 : 1}
            >
              {children}
            </Text>
            {icon && iconPlacement === 'end' && iconComp}
          </>
        )}
      </Stack>
    </TouchableOpacity>
  );
}

const sizeToTextVariant: Record<ButtonSize, Typography> = {
  small: 'bodyExtraSmallBold',
  normal: 'bodySmallBold',
  large: 'bodySemiBold',
};

const sizeToLineHeight: Record<ButtonSize, number> = {
  small: 18,
  normal: 22,
  large: 26,
};

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    borderRadius: theme.radii.full,
    variants: {
      size: {
        small: { minHeight: 32, paddingHorizontal: theme.space.small },
        normal: { minHeight: 44, paddingHorizontal: theme.space.regular },
        large: { minHeight: 60, paddingHorizontal: theme.space.medium },
      },
      disabled: {
        true: { opacity: 0.9 },
      },
    },
  },
}));
