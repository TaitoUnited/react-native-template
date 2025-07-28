import { useLingui } from '@lingui/react/macro';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { type TabList } from '~app/(tabs)/_layout';
import { Icon, Stack, Text } from '~components/uikit';

const ANIMATION_DURATION = 350;

type TabBarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
  tab: TabList[number];
};

export function TabBarButton({
  isFocused,
  label,
  tab,
  ...pressableProps
}: TabBarButtonProps) {
  const { t } = useLingui();
  const iconScale = useSharedValue(isFocused ? 1 : 0);
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);

  const updateFocusAnimation = (focused: boolean) => {
    iconScale.value = withSpring(focused ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
    labelOpacity.value = withSpring(focused ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  };

  useEffect(() => updateFocusAnimation(isFocused), [isFocused]); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(iconScale.value, [0, 1], [1, 1.2]) }],
    top: interpolate(iconScale.value, [0, 1], [0, 8]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(labelOpacity.value, [0, 1], [1, 0]),
  }));

  return (
    <Pressable
      {...pressableProps}
      testID={label}
      style={styles.pressable}
      onPressIn={() => (iconScale.value = withTiming(0.8, { duration: 150 }))}
      onPressOut={() => (iconScale.value = withTiming(1, { duration: 150 }))}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={t`Double tap to select this tab`}
    >
      <Stack axis="y" align="center" spacing="xs">
        <Animated.View style={animatedIconStyle}>
          <Icon
            name={isFocused ? tab.iconFilled : tab.iconOutlined}
            color={isFocused ? 'primary' : 'neutral2'}
          />
        </Animated.View>
        <Animated.View style={animatedTextStyle}>
          <Text
            variant="bodyExtraSmall"
            color={isFocused ? 'primary' : 'textMuted'}
          >
            {label}
          </Text>
        </Animated.View>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
