import type { ButtonProps, ButtonVariant } from './types';
import ButtonContent from './ButtonContent';
import { styled, Theme } from '~styles';

export function OutlineButton({
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
  primary: 'primary',
  danger: 'error',
};

const Wrapper = styled('TouchableOpacity', {
  backgroundColor: 'transparent',
  borderRadius: '$full',
  borderWidth: 1,

  variants: {
    variant: {
      primary: { borderColor: '$primary' },
      danger: { borderColor: '$error' },
    },
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
});
