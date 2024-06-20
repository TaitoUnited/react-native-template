import { ActivityIndicator } from 'react-native';
import { Typography, styled, useTheme } from '~styles';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import { getButtonWrapperStyle, getTextColor, sizeToIconSize } from './helpers';
import { ButtonProps, ButtonSize } from './types';

export function Button({
  children,
  color = 'primary',
  icon,
  iconPlacement = 'start',
  loading,
  disabled,
  size = 'normal',
  style,
  variant = 'filled',
  onPress,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
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

  return (
    <Wrapper
      size={size}
      disabled={disabled}
      style={[wrapperStyle, style]}
      onPress={!disabled ? onPress : () => {}}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[textColor]} size="small" />
      ) : (
        <Stack
          axis="x"
          align="center"
          justify="center"
          style={{ flex: 1 }}
          spacing={size === 'large' ? 'small' : 'xs'}
        >
          {icon && iconPlacement === 'start' && iconComp}
          <Text
            variant={textVariant}
            style={{
              color: theme.colors[textColor],
              lineHeight: sizeToLineHeight[size],
            }}
            numberOfLines={size === 'large' ? 2 : 1}
          >
            {children}
          </Text>
          {icon && iconPlacement === 'end' && iconComp}
        </Stack>
      )}
    </Wrapper>
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

const Wrapper = styled('TouchableOpacity', {
  borderRadius: '$full',
  flexCenter: 'row',
  variants: {
    size: {
      small: {
        minHeight: 32,
        paddingHorizontal: '$small',
      },
      normal: {
        minHeight: 44,
        paddingHorizontal: '$regular',
      },
      large: {
        minHeight: 60,
        paddingHorizontal: '$medium',
      },
    },
    disabled: {
      true: {
        opacity: 0.9,
      },
    },
  },
}).attrs(({ disabled }) => ({
  activeOpacity: disabled ? 0.9 : 0.8,
}));
