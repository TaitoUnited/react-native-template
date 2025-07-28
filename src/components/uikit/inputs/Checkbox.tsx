import { useLingui } from '@lingui/react/macro';
import { PixelRatio, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { haptics } from '~utils/haptics';

import { Icon } from '../Icon';
import { Text } from '../Text';

type Props = {
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  label: string;
};

export function Checkbox({ onChange, checked, value, label }: Props) {
  const { t } = useLingui();
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(checked ? 1 : 0, {
            duration: 100,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  function onPress() {
    haptics.selection();
    onChange(value);
  }

  styles.useVariants({ checked });

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.8}
      accessible
      accessibilityRole="checkbox"
      accessibilityLabel={t`Checkbox option: ${label}`}
      accessibilityState={{ checked }}
      accessibilityHint={
        checked
          ? t`Double tap to check this option`
          : t`Double tap to uncheck this option`
      }
    >
      <View style={styles.radioOuter}>
        <Animated.View style={animatedStyles}>
          <Icon name="check" size={18} color="textOnContrastingBg" />
        </Animated.View>
      </View>

      <Text variant={checked ? 'bodyBold' : 'body'}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    position: 'relative',
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderRadius: theme.radii.regular,
    borderWidth: PixelRatio.roundToNearestPixel(1.5), // try to match with icon width
    marginRight: theme.space.small,
    borderColor: theme.colors.text,
    ...theme.utils.flexCenter,
    variants: {
      checked: {
        true: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
}));
