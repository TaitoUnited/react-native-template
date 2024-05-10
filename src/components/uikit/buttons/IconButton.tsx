import { ReactNode } from 'react';
import { ActivityIndicator, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Color, styled, useTheme } from '~styles';

import { Icon, IconName } from '../Icon';

type Size = 'small' | 'medium' | 'large';

type Props = PressableProps & {
  icon: IconName;
  forcedColor?: string; // NOTE: use this only in very special cases!!!
  size?: Size;
  color?: Color;
  loading?: boolean;
};

const WANTED_HIT_SIZE = 44;

export function IconButton({
  size = 'medium',
  color = 'text',
  icon,
  forcedColor,
  loading,
  ...rest
}: Props) {
  const theme = useTheme();
  const pressed = useSharedValue(false);
  const iconSize = sizeToIconSize[size];

  const hitSlop = {
    top: (WANTED_HIT_SIZE - iconSize) / 2,
    bottom: (WANTED_HIT_SIZE - iconSize) / 2,
    left: (WANTED_HIT_SIZE - iconSize) / 2,
    right: (WANTED_HIT_SIZE - iconSize) / 2,
  };

  let content: ReactNode = (
    <Icon name={icon} color={color} forcedColor={forcedColor} size={iconSize} />
  );

  if (loading) {
    content = (
      <ActivityIndicator
        size="small"
        color={forcedColor || theme.colors[color]}
      />
    );
  }

  function handlePressIn() {
    pressed.value = true;
  }

  function handlePressOut() {
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
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <PressHighlight style={highlightStyles} />
      <Animated.View style={contentStyles}>{content}</Animated.View>
    </Wrapper>
  );
}

const sizeToIconSize: Record<Size, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

const Wrapper = styled('Pressable', {
  flexCenter: 'row',
  position: 'relative',
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
