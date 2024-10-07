import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

import { styled, useTheme } from '~styles';

type BottomSheetProps = RNBottomSheetProps & {
  initialIndex: number;
  snapPoints: string[]; // e.g. ['25%', '50%']
  children: ReactNode;
  onSheetChange?: (index: number) => void;
};

export const BottomSheet = forwardRef<RNBottomSheet, BottomSheetProps>(
  (
    {
      initialIndex,
      snapPoints,
      children,
      onSheetChange,
      keyboardBehavior = 'interactive',
      ...rest
    }: BottomSheetProps,
    ref
  ) => {
    const theme = useTheme();

    const bottomSheetRef = useRef<RNBottomSheet>(null);
    useImperativeHandle(ref, () => bottomSheetRef.current as RNBottomSheet);

    const handleSheetChanges = (index: number) => {
      if (onSheetChange) {
        onSheetChange(index);
      }
    };

    return (
      <RNBottomSheet
        {...rest}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        index={initialIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        keyboardBehavior={keyboardBehavior}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={false}
            opacity={0.2}
            disappearsOnIndex={-1}
            pressBehavior="none"
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
