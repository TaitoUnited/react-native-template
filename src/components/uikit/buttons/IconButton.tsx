import { msg } from '@lingui/macro';
import { ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useI18n } from '~services/i18n';
import { styled, useTheme } from '~styles';

import { Icon } from '../Icon';
import { getIconColor, getIconWrapperStyle, sizeToIconSize } from './helpers';
import { IconButtonProps } from './types';

const HIT_SLOP_FACTOR = 1.2;

export function IconButton({
  icon,
  color = 'neutral',
  size = 'normal',
  variant = 'filled',
  loading,
  disabled,
  onPress,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: IconButtonProps) {
  const { _ } = useI18n();
  const theme = useTheme();
  const pressed = useSharedValue(false);
  const iconSize = sizeToIconSize[size];
  const wantedHitSize = iconSize * HIT_SLOP_FACTOR;

  const hitSlop = {
    top: (wantedHitSize - iconSize) / 2,
    bottom: (wantedHitSize - iconSize) / 2,
    left: (wantedHitSize - iconSize) / 2,
    right: (wantedHitSize - iconSize) / 2,
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
      onPress={!disabled ? onPress : undefined}
      style={wrapperStyle}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityLabel={accessibilityLabel ?? _(msg`Icon button with ${icon} icon`)} // prettier-ignore
      accessibilityHint={accessibilityHint ?? _(msg`Double tap to perform action`)} // prettier-ignore
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
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
        height: 16,
        width: 16,
        borderRadius: '$regular',
      },
      normal: {
        height: 24,
        width: 24,
        borderRadius: '$regular',
      },
      large: {
        height: 44,
        width: 44,
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
