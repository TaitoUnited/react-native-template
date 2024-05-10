import { Fragment, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { styled } from '~styles';

import { Text } from './Text';

type Props<T> = {
  segments: Array<{ value: T; label: string }>;
  selected: T;
  onSelect: (value: T) => void;
};

export function SegmentedControl<T>(props: Props<T>) {
  const [layout, setLayout] = useState<LayoutRectangle>();

  return (
    <Wrapper
      onLayout={(e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout)}
    >
      {!!layout && <Segments {...props} width={layout.width} />}
    </Wrapper>
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
  }

  return (
    <>
      <SegmentBackground style={segmentBackgroundStyle} />

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
      <SegmentButton onPress={onSelect}>
        <Text
          align="center"
          variant="bodySmallBold"
          color={isActive ? 'text' : 'textMuted'}
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {label}
        </Text>
      </SegmentButton>
      <SegmentSeparator style={separatorOpacity} />
    </Fragment>
  );
}

// NOTE: we are using hard coded border radii here in order to have the wrapper
// and the segment button radii match perfectly

const Wrapper = styled('View', {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '$surface',
  borderRadius: 10,
});

const SegmentBackground = Animated.createAnimatedComponent(
  styled('View', {
    absoluteFill: true,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
    borderRadius: 8,
  })
);

const SegmentButton = styled('TouchableOpacity', {
  position: 'relative',
  flex: 1,
  flexCenter: 'row',
  paddingVertical: '$small',
  paddingHorizontal: '$regular',
  zIndex: 1,
  elevation: 1,
}).attrs(() => ({
  activeOpacity: 0.8,
}));

const SegmentSeparator = Animated.createAnimatedComponent(
  styled('View', {
    width: 1,
    height: '50%',
    backgroundColor: '$border',
    zIndex: -1,
    elevation: -1,
  })
);
