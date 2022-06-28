import type { ButtonProps, ButtonVariant } from './types';
import ButtonContent from './ButtonContent';
import { styled, Theme } from '~styles';

export function FillButton({
  variant = 'primary',
  disabled = false,
  style,
  onPress,
  ...rest
}: ButtonProps) {
  const textColor = variantToTextColor[variant];

  return (
    <Wrapper
      variant={variant}
      activeOpacity={0.8}
      disabled={disabled}
      style={style}
      onPress={onPress}
    >
      <ButtonContent textColor={textColor} {...rest} />
    </Wrapper>
  );
}

const variantToTextColor: Record<ButtonVariant, keyof Theme['colors']> = {
  primary: 'primaryText',
  danger: 'errorText',
};

const Wrapper = styled('TouchableOpacity', {
  borderRadius: '$full',

  variants: {
    variant: {
      primary: { backgroundColor: '$primary' },
      danger: { backgroundColor: '$error' },
    },
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
});
