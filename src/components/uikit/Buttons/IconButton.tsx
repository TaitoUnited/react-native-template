import { ActivityIndicator } from 'react-native';

import { Icon } from '../Icon';
import type { IconButtonProps, ButtonSize } from './types';
import { styled, useTheme, Theme } from '~styles';

type Props = IconButtonProps & {
  iconColor?: keyof Theme['colors'];
};

const WANTED_HIT_SIZE = 44;

export function IconButton({
  size = 'large',
  iconColor,
  icon,
  loading,
  disabled,
  style,
  onPress,
}: Props) {
  const theme = useTheme();
  const iconSize = sizeToIconSize[size];
  const hitSlop = {
    top: (WANTED_HIT_SIZE - iconSize) / 2,
    bottom: (WANTED_HIT_SIZE - iconSize) / 2,
    left: (WANTED_HIT_SIZE - iconSize) / 2,
    right: (WANTED_HIT_SIZE - iconSize) / 2,
  };

  let decoration: React.ReactNode = null;

  decoration = <Icon name={icon} color={iconColor} size={iconSize} />;

  if (loading) {
    decoration = (
      <ActivityIndicator
        size="small"
        color={iconColor ? theme.colors[iconColor] : theme.colors.text}
      />
    );
  }

  return (
    <Wrapper
      disabled={disabled}
      onPress={onPress}
      style={style}
      hitSlop={hitSlop}
    >
      {decoration}
    </Wrapper>
  );
}

const sizeToIconSize: Record<ButtonSize, number> = {
  small: 24,
  medium: 28,
  large: 32,
};

const Wrapper = styled('TouchableOpacity', {
  flexCenter: 'row',

  variants: {
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
});
