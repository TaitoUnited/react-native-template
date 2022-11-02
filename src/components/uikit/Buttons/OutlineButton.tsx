import type { ButtonProps } from './types';
import ButtonContent from './ButtonContent';
import { styled } from '~styles';

export function OutlineButton({
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
      <ButtonContent textColor="primary" {...rest} />
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  backgroundColor: 'transparent',
  borderRadius: '$medium',
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
  defaultVariants: {
    variant: 'primary',
  },
});
