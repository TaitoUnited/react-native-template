import type { ButtonProps, ButtonVariant } from './types';
import ButtonContent from './ButtonContent';
import { Color, styled } from '~styles';

export function OutlineButton({
  children,
  size,
  icon,
  iconSide,
  iconPosition,
  loading,
  variant,
  ...rest
}: ButtonProps) {
  return (
    <Wrapper {...rest} variant={variant}>
      <ButtonContent
        variant={variant}
        size={size}
        icon={icon}
        iconSide={iconSide}
        iconPosition={iconPosition}
        loading={loading}
      >
        {children}
      </ButtonContent>
    </Wrapper>
  );
}

const variantToUnderlayColor: Record<ButtonVariant, Color> = {
  primary: 'primaryMuted',
  danger: 'errorMuted',
  warn: 'warnMuted',
  info: 'infoMuted',
  neutral: 'neutral5',
};

const Wrapper = styled('TouchableHighlight', {
  backgroundColor: 'transparent',
  borderRadius: '$full',
  borderWidth: 1,
  variants: {
    variant: {
      primary: { borderColor: '$primary' },
      danger: { borderColor: '$error' },
      warn: { borderColor: '$warn' },
      info: { borderColor: '$info' },
      neutral: { borderColor: '$textMuted' },
    },
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
}).attrs((p) => ({
  underlayColor: p.theme.colors[variantToUnderlayColor[p.variant || 'neutral']],
}));
