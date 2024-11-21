import RNBottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetProps as RNBottomSheetProps,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {
  type ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { styled, useTheme } from '~styles';

type BottomSheetProps = RNBottomSheetProps & {
  initialIndex: number;
  snapPoints: string[]; // e.g. ['25%', '50%']
  children: ReactNode;
  onSheetChange?: (index: number) => void;
  onSheetAnimate?: (fromIndex: number, toIndex: number) => void;
};

export const BottomSheet = forwardRef<RNBottomSheet, BottomSheetProps>(
  (
    {
      initialIndex,
      snapPoints,
      children,
      onSheetChange,
      onSheetAnimate,
      keyboardBehavior = 'interactive',
      ...rest
    }: BottomSheetProps,
    ref
  ) => {
    const theme = useTheme();

    const bottomSheetRef = useRef<RNBottomSheet>(null);
    useImperativeHandle(ref, () => ({
      close: () => bottomSheetRef.current?.close(),
      expand: () => bottomSheetRef.current?.expand(),
      snapToIndex(index) {
        bottomSheetRef.current?.snapToIndex(index);
      },
      snapToPosition(position, animationConfigs) {
        bottomSheetRef.current?.snapToPosition(position, animationConfigs);
      },
      collapse: () => bottomSheetRef.current?.collapse(),
      forceClose: () => bottomSheetRef.current?.forceClose(),
    }));

    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
    });

    const handleSheetChanges = (index: number) => {
      if (onSheetChange) {
        onSheetChange(index);
      }
    };
    useEffect(() => {
      if (bottomSheetRef.current) {
        console.log('BottomSheet ref is available');
      }
    }, [bottomSheetRef]);
    const handleSheetAnimate = (fromIndex: number, toIndex: number) => {
      if (onSheetAnimate) {
        onSheetAnimate(fromIndex, toIndex);
      }
    };

    return (
      <RNBottomSheet
        {...rest}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        index={initialIndex}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount
        onChange={handleSheetChanges}
        onAnimate={handleSheetAnimate}
        enablePanDownToClose
        keyboardBehavior={keyboardBehavior}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={false}
            opacity={0.2}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </RNBottomSheet>
    );
  }
);

// eslint-disable-next-line lingui/no-unlocalized-strings
BottomSheet.displayName = 'BottomSheet';

const ContentWrapper = styled('View', {
  padding: '$regular',
});
