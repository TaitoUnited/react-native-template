import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { ReactNode, forwardRef } from 'react';

import { styled, useTheme } from '~styles';

interface BottomSheetProps {
  initialIndex: number;
  snapPoints: string[]; // e.g. ['25%', '50%']
  children: ReactNode;
  onSheetChange?: (index: number) => void;
  keyboardBehavior?: RNBottomSheetProps['keyboardBehavior'];
}

export const BottomSheet = forwardRef(
  (
    {
      initialIndex,
      snapPoints,
      children,
      onSheetChange,
      keyboardBehavior = 'interactive',
    }: BottomSheetProps,
    ref: any
  ) => {
    const theme = useTheme();

    const handleSheetChanges = (index: number) => {
      if (onSheetChange) {
        onSheetChange(index);
      }
    };

    return (
      <RNBottomSheet
        ref={ref}
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
