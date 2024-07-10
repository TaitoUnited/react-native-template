import { ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { styled, useTheme } from '~styles';

import { Icon } from '../Icon';
import { getIconColor, getIconWrapperStyle, sizeToIconSize } from './helpers';
import { IconButtonProps } from './types';

const WANTED_HIT_SIZE = 44;

export function IconButton({
  icon,
  color = 'primary',
  size = 'normal',
  variant = 'filled',
  loading,
  disabled,
  onPress,
  ...rest
}: IconButtonProps) {
  const theme = useTheme();
  const pressed = useSharedValue(false);
  const iconSize = sizeToIconSize[size];

  const hitSlop = {
    top: (WANTED_HIT_SIZE - iconSize) / 2,
    bottom: (WANTED_HIT_SIZE - iconSize) / 2,
    left: (WANTED_HIT_SIZE - iconSize) / 2,
    right: (WANTED_HIT_SIZE - iconSize) / 2,
  };

  const wrapperStyle = getIconWrapperStyle({
    theme,
    variant,
    color,
    disabled,
  });

  const iconColor = getIconColor({ variant, color, disabled });

  function handlePressIn() {
    if (disabled) return;
    pressed.value = true;
  }

  function handlePressOut() {
    if (disabled) return;
    pressed.value = false;
  }

  const contentStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 0.8 : 1) }],
    };
  });

  const highlightStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(pressed.value ? 1 : 0),
      transform: [{ scale: withSpring(pressed.value ? 1.3 : 1.6) }],
    };
  });

  return (
    <Wrapper
      hitSlop={hitSlop}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      size={size}
      disabled={disabled}
      onPress={!disabled ? onPress : () => {}}
      style={wrapperStyle}
      {...rest}
    >
      <PressHighlight style={highlightStyles} />
      {loading ? (
        <ActivityIndicator color={theme.colors[iconColor]} size="small" />
      ) : (
        <Animated.View style={contentStyles}>
          <Icon name={icon} color={iconColor} size={iconSize} />
        </Animated.View>
      )}
    </Wrapper>
  );
}

const Wrapper = styled('Pressable', {
  borderRadius: '$medium',
  position: 'relative',
  flexCenter: 'row',
  variants: {
    size: {
      small: {
        height: 32,
        width: 32,
        borderRadius: '$regular',
      },
      normal: {
        height: 44,
        width: 44,
        borderRadius: '$regular',
      },
      large: {
        height: 60,
        width: 60,
      },
    },
    disabled: {
      true: {
        opacity: 0.9,
      },
    },
  },
});

const PressHighlight = Animated.createAnimatedComponent(
  styled('View', {
    absoluteFill: true,
    zIndex: -1,
    elevation: -1,
    backgroundColor: '$pressHighlight',
    borderRadius: '$full',
  })
);
