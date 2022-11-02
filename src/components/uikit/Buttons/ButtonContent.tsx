import { ActivityIndicator } from 'react-native';

import { Text } from '../Text';
import { Stack } from '../Stack';
import { Icon } from '../Icon';
import type { ButtonProps, ButtonSize } from './types';
import type { Token as Typography } from '~design-system/typography';
import { styled, useTheme, Theme } from '~styles';

type Props = Omit<ButtonProps, 'onPress' | 'disabled'> & {
  textColor: keyof Theme['colors'];
};

export default function ButtonContent({
  children,
  size = 'large',
  textColor,
  icon,
  iconPlacement = 'right',
  loading,
}: Props) {
  const theme = useTheme();
  const textVariant = sizeToTextVariant[size];
  const iconSize = sizeToIconSize[size];

  let decoration: React.ReactNode = null;

  if (icon) {
    decoration = <Icon name={icon} color={textColor} size={iconSize} />;
  }

  if (loading) {
    decoration = (
      <ActivityIndicator
        size="small"
        color={theme.colors[textColor] as string}
      />
    );
  }

  return (
    <Wrapper size={size}>
      <Stack
        axis="x"
        align="center"
        justify="center"
        spacing={size === 'large' ? 'small' : 'xsmall'}
      >
        <Decoration>
          {Boolean(decoration && iconPlacement === 'left') && decoration}
        </Decoration>

        {!!children && (
          <Text variant={textVariant} color={textColor}>
            {children}
          </Text>
        )}

        <Decoration>
          {Boolean(decoration && iconPlacement === 'right') && decoration}
        </Decoration>
      </Stack>
    </Wrapper>
  );
}

const sizeToTextVariant: Record<ButtonSize, Typography> = {
  small: 'bodySmallBold',
  medium: 'bodySmallBold',
  large: 'bodyBold',
};

const sizeToIconSize: Record<ButtonSize, number> = {
  small: 14,
  medium: 14,
  large: 20,
};

const Wrapper = styled('View', {
  flexCenter: 'row',
  variants: {
    size: {
      small: {
        minHeight: 26,
        paddingHorizontal: '$small',
      },
      medium: {
        minHeight: 34,
        paddingHorizontal: '$medium',
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
