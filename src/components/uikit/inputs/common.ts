import { useEffect, useRef, useState } from 'react';
import { Easing, Animated, LayoutChangeEvent } from 'react-native';

import { useTheme } from '~styles';

export function useInputLabelAnimation({
  isAnimated,
}: {
  isAnimated: boolean;
}) {
  const labelAnimation = useRef(new Animated.Value(isAnimated ? 1 : 0));
  const [labelWidth, setLabelWidth] = useState(0);
  const { space } = useTheme();

  const labelStyles = {
    transform: [
      { translateX: -labelWidth / 2 }, // correct transform origin
      { translateX: space.small as number },
      {
        translateY: labelAnimation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [space.medium as number, 5],
        }),
      },
      {
        scale: labelAnimation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.75],
        }),
      },
      { translateX: labelWidth / 2 }, // correct transform origin
    ],
  };

  function measureLabel(e: LayoutChangeEvent) {
    const { width } = e.nativeEvent.layout;
    setLabelWidth(width);
  }

  function animateLabel(toValue: number) {
    Animated.timing(labelAnimation.current, {
      toValue,
      duration: 200,
      easing: Easing.bezier(0, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    animateLabel(isAnimated ? 1 : 0);
  }, [isAnimated]); // eslint-disable-line react-hooks/exhaustive-deps

  return { labelStyles, labelAnimation, measureLabel, animateLabel };
}
