import { useLingui } from '@lingui/react/macro';
import { useEffect, useRef } from 'react';
import { Animated, PixelRatio, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { haptics } from '~utils/haptics';

import { Text } from '../Text';

type Props = {
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  label: string;
};

export function Radio({ onChange, checked, value, label }: Props) {
  const { t } = useLingui();

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
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      accessibilityLabel={t`Radio option: ${label}`}
      accessibilityHint={t`Double tap to select this option`}
    >
      <View style={styles.radioOuter}>{checked && <RadioInner />}</View>
      <Text variant={checked ? 'bodyBold' : 'body'}>{label}</Text>
    </TouchableOpacity>
  );
}

function RadioInner() {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.radioCircle, { transform: [{ scale }] }]} />
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
    borderRadius: theme.radii.full,
    borderWidth: PixelRatio.roundToNearestPixel(1.5), // match checkbox
    marginRight: theme.space.small,
    borderColor: theme.colors.line1,
    variants: {
      checked: {
        true: {
          borderColor: theme.colors.primary,
        },
      },
    },
  },
  radioCircle: {
    position: 'absolute',
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
  },
}));
