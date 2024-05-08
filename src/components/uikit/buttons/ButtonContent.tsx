import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { Icon } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types';
import { Color, Typography, styled, useTheme } from '~styles';

type Props = {
  children: ReactNode;
  variant: ButtonProps['variant'];
  icon: ButtonProps['icon'];
  iconSide: ButtonProps['iconSide'];
  iconPosition: ButtonProps['iconPosition'];
  size: ButtonProps['size'];
  loading: ButtonProps['loading'];
};

export default function ButtonContent({
  children,
  variant,
  icon,
  iconSide = 'end',
  iconPosition = 'label',
  size = 'medium',
  loading = false,
}: Props) {
  const theme = useTheme();
  const textVariant = sizeToTextVariant[size];
  const iconSize = sizeToIconSize[size];
  const color = variantToColor[variant];

  let decoration: ReactNode = null;

  if (icon) {
    decoration = <Icon name={icon} color={color} size={iconSize} />;
  }

  if (loading) {
    decoration = (
      <ActivityIndicator size="small" color={theme.colors[color] as string} />
    );
  }

  return (
    <Wrapper size={size}>
      <Stack
        axis="x"
        align="center"
        justify="center"
        spacing={size === 'large' ? 'small' : 'xs'}
      >
        {!!decoration && (
          <Decoration>
            {Boolean(decoration && iconSide === 'start') && decoration}
          </Decoration>
        )}

        <Label
          variant={textVariant}
          color={color}
          fill={!!decoration && iconPosition === 'edge'}
          numberOfLines={size === 'large' ? 2 : 1}
        >
          {children}
        </Label>

        {!!decoration && (
          <Decoration>
            {Boolean(decoration && iconSide === 'end') && decoration}
          </Decoration>
        )}
      </Stack>
    </Wrapper>
  );
}

const variantToColor: Record<ButtonVariant, Color> = {
  primary: 'primaryContrast',
  danger: 'errorContrast',
  warn: 'warnContrast',
  info: 'infoContrast',
  neutral: 'text',
};

const sizeToTextVariant: Record<ButtonSize, Typography> = {
  small: 'bodySmallBold',
  medium: 'bodyBold',
  large: 'bodyLargeBold',
};

const sizeToIconSize: Record<ButtonSize, number> = {
  small: 14,
  medium: 18,
  large: 22,
};

const Wrapper = styled('View', {
  flexCenter: 'row',
  variants: {
    size: {
      small: {
        minHeight: 32,
        paddingHorizontal: '$small',
      },
      medium: {
        minHeight: 44,
        paddingHorizontal: '$regular',
      },
      large: {
        minHeight: 60,
        paddingHorizontal: '$medium',
      },
    },
  },
});

const Decoration = styled('View', {
  minWidth: 20,
});

const Label = styled(Text, {
  textAlign: 'center',
  variants: {
    fill: {
      true: { flex: 1 },
    },
  },
});
