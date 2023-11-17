import React, { useCallback, useRef, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import RNBottomSheet, {
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';

import { styled, useTheme } from '~styles';

interface BottomSheetProps {
  initialIndex: number;
  snapPoints?: string[];
  children: ReactNode;
  onSheetChanges?: (index: number) => void;
  keyboardBehavior?: RNBottomSheetProps['keyboardBehavior'];
}

export function BottomSheet({
  initialIndex,
  snapPoints = ['25%', '50%'],
  children,
  onSheetChanges,
  keyboardBehavior = 'interactive',
}: BottomSheetProps) {
  const theme = useTheme();
  const bottomSheetRef = useRef<RNBottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (onSheetChanges) {
        onSheetChanges(index);
      }
    },
    [onSheetChanges]
  );

  const { height, width } = Dimensions.get('window');

  return (
    <Wrapper style={{ height, width }}>
      <RNBottomSheet
        backgroundStyle={{ backgroundColor: theme.colors.elevated }}
        ref={bottomSheetRef}
        index={initialIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        keyboardBehavior={keyboardBehavior}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </RNBottomSheet>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  position: 'absolute',
});

const ContentWrapper = styled('View', {
  paddingHorizontal: '$normal',
  marginTop: 30,
});
