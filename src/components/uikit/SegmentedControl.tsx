import { useLingui } from '@lingui/react/macro';
import { Fragment, useState } from 'react';
import {
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { haptics } from '~utils/haptics';

import { Text } from './Text';

type Props<T> = {
  segments: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
};

export function SegmentedControl<T>(props: Props<T>) {
  const [layout, setLayout] = useState<LayoutRectangle>();

  return (
    <View
      style={styles.wrapper}
      onLayout={(e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout)}
    >
      {!!layout && <Segments {...props} width={layout.width} />}
    </View>
  );
}

function Segments<T>({
  segments,
  selected,
  width,
  onSelect,
}: Props<T> & { width: number }) {
  const activeIndex = segments.findIndex((s) => s.value === selected);
  const segmentSize = width / segments.length;
  const offset = useSharedValue(segmentSize * activeIndex);

  const segmentBackgroundStyle = useAnimatedStyle(() => {
    return {
      margin: 4,
      width: segmentSize - 8,
      transform: [
        {
          translateX: withSpring(offset.value, { stiffness: 350, damping: 50 }),
        },
      ],
    };
  });

  function handleSegmentChange(index: number) {
    offset.value = segmentSize * index;
    onSelect(segments[index].value);
    haptics.selection();
  }

  return (
    <>
      <Animated.View
        style={[styles.segmentBackground, segmentBackgroundStyle]}
      />

      {segments.map((segment, index) => {
        return (
          <Segment
            key={segment.label}
            label={segment.label}
            isLast={index === segments.length - 1}
            isFirst={index === 0}
            isActive={index === activeIndex}
            distanceFromActive={index - activeIndex}
            onSelect={() => handleSegmentChange(index)}
          />
        );
      })}
    </>
  );
}

function Segment({
  label,
  isActive,
  isLast,
  distanceFromActive,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  isLast: boolean;
  isFirst: boolean;
  distanceFromActive: number;
  onSelect: () => void;
}) {
  const { t } = useLingui();
  const separatorOpacity = useAnimatedStyle(() => {
    let opacity = 0;

    const isOnRightSide = distanceFromActive > 0 && !isLast;
    const isOnLeftSide = distanceFromActive < -1;

    if (isOnRightSide || isOnLeftSide) {
      opacity = 1;
    }

    return { opacity: withTiming(opacity) };
  });

  return (
    <Fragment>
      <TouchableOpacity
        style={styles.segmentButton}
        onPress={onSelect}
        activeOpacity={0.8}
        accessible
        accessibilityRole="menuitem"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={t`Segment ${label}`}
        accessibilityHint={t`Double tap to select this segment`}
      >
        <Text
          align="center"
          variant={isActive ? 'bodySmallBold' : 'bodySmall'}
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {label}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.segmentSeparator, separatorOpacity]} />
    </Fragment>
  );
}

// NOTE: we are using hard coded border radii here in order to have the wrapper
// and the segment button radii match perfectly

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
  },
  segmentBackground: {
    borderRadius: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
    ...theme.utils.absoluteFill,
  },
  segmentButton: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.space.small,
    paddingHorizontal: theme.space.regular,
    zIndex: 1,
    elevation: 1,
  },
  segmentSeparator: {
    width: 1,
    height: '50%',
    backgroundColor: theme.colors.line2,
  },
}));
