import type { ButtonProps } from './types';
import ButtonContent from './ButtonContent';
import { styled } from '~styles';

export function FillButton({
  disabled = false,
  style,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <Wrapper
      activeOpacity={0.8}
      disabled={disabled}
      style={style}
      onPress={onPress}
    >
      <ButtonContent textColor="primaryText" {...rest} />
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  borderRadius: '$medium',
  variants: {
    variant: {
      primary: { backgroundColor: '$primaryMuted' },
      danger: { backgroundColor: '$errorMuted' },
    },
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
