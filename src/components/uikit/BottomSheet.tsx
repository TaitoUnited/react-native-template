import RNBottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
  type BottomSheetBackdropProps,
  type BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type BottomSheetProps = RNBottomSheetProps & {
  initialIndex?: number;
  snapPoints: string[]; // e.g. ['25%', '50%']
  children: ReactNode;
  onSheetChange?: (index: number) => void;
  onSheetAnimate?: (fromIndex: number, toIndex: number) => void;
};

export const BottomSheet = forwardRef<RNBottomSheet, BottomSheetProps>(
  (
    {
      initialIndex = 0,
      snapPoints,
      children,
      onSheetChange,
      onSheetAnimate,
      keyboardBehavior = 'interactive',
      ...rest
    }: BottomSheetProps,
    ref
  ) => {
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

    function renderBackdropComponent(props: BottomSheetBackdropProps) {
      return (
        <BottomSheetBackdrop
          {...props}
          enableTouchThrough={false}
          opacity={0.2}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      );
    }

    return (
      <RNBottomSheet
        {...rest}
        ref={bottomSheetRef}
        backgroundStyle={styles.background}
        index={initialIndex}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount
        onChange={handleSheetChanges}
        onAnimate={handleSheetAnimate}
        enablePanDownToClose
        keyboardBehavior={keyboardBehavior}
        backdropComponent={renderBackdropComponent}
        accessible={false} // Important if you want to access the bottom sheet content
      >
        <View style={styles.contentWrapper}>{children}</View>
      </RNBottomSheet>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

const styles = StyleSheet.create((theme) => ({
  contentWrapper: {
    padding: theme.space.regular,
  },
  background: {
    backgroundColor: theme.colors.surface,
  },
}));
