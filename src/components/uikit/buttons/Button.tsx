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
  iconLeading,
  iconTrailing,
  loading,
  disabled,
  size = 'large',
  style,
  variant = 'filled',
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

  return (
    <Wrapper
      size={size}
      disabled={disabled}
      style={[wrapperStyle, style]}
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
          {iconLeading && (
            <Icon name={iconLeading} color={textColor} size={iconSize} />
          )}
          <Text
            variant={textVariant}
            style={{
              color: theme.colors[textColor],
              lineHeight: sizeToLineHeight[size],
              // Should we align the text in the center regardless of the icon?
              // paddingLeft: iconLeading ? 0 : sizeToIconSize[size],
              // paddingRight: iconTrailing ? 0 : sizeToIconSize[size],
            }}
            numberOfLines={size === 'large' ? 2 : 1}
          >
            {children}
          </Text>
          {iconTrailing && (
            <Icon name={iconTrailing} color={textColor} size={iconSize} />
          )}
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
  borderRadius: '$medium',
  flexCenter: 'row',
  border: '1px solid red',
  variants: {
    size: {
      small: {
        minHeight: 32,
        paddingHorizontal: '$small',
        borderRadius: '$regular',
      },
      normal: {
        minHeight: 44,
        paddingHorizontal: '$regular',
        borderRadius: '$regular',
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
  activeOpacity: disabled ? 9 : 0.8,
}));
