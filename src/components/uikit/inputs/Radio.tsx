import { msg } from '@lingui/macro';
import { useEffect, useRef } from 'react';
import { Animated, PixelRatio } from 'react-native';

import { useI18n } from '~services/i18n';
import { styled } from '~styles';

import { Text } from '../Text';

type Props = {
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  label: string;
};

export function Radio({ onChange, checked, value, label }: Props) {
  const { _ } = useI18n();
  return (
    <Wrapper
      onPress={() => onChange(value)}
      activeOpacity={0.8}
      accessible
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      accessibilityLabel={_(msg`Radio option: ${label}`)}
      accessibilityHint={_(msg`Double tap to select this option`)}
    >
      <RadioOuter checked={checked}>{checked && <RadioInner />}</RadioOuter>
      <Text variant={checked ? 'bodyBold' : 'body'}>{label}</Text>
    </Wrapper>
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

  return <RadioCircle style={{ transform: [{ scale }] }} />;
}

const Wrapper = styled('TouchableOpacity', {
  flexDirection: 'row',
  alignItems: 'center',
});

const RadioOuter = styled('View', {
  position: 'relative',
  width: 24,
  height: 24,
  backgroundColor: 'transparent',
  borderRadius: '$full',
  borderWidth: PixelRatio.roundToNearestPixel(1.5), // match checkbox
  marginRight: '$small',
  borderColor: '$line1',
  variants: {
    checked: {
      true: {
        borderColor: '$primary',
      },
    },
  },
});

const RadioCircle = Animated.createAnimatedComponent(
  styled('View', {
    position: 'absolute',
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
    borderRadius: '$full',
    backgroundColor: '$primary',
  })
);
