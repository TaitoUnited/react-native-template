import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Button, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

/**
 * NOTE: This example implementation does not use the UI Kit Bottom Sheet because of the ref we are using to control the sheet
 */
export default function BottomSheets() {
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const [showCustomBackdrop, setShowCustomBackdrop] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = (index: number) => {
    console.log('handleSheetChange', index);
  };
  const handleSheetAnimate = (fromIndex: number, toIndex: number) => {
    console.log('handleSheetAnimate', `from ${fromIndex} to ${toIndex}`);
  };
  const handleSnapPress = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };
  const handleExpandPress = () => {
    bottomSheetRef.current?.expand();
  };
  const handleCollapsePress = () => {
    bottomSheetRef.current?.collapse();
  };
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const toggleCustomBackdrop = () => setShowCustomBackdrop((prev) => !prev);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => {
      if (!showCustomBackdrop) {
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
    },
    [showCustomBackdrop]
  );

  return (
    <Wrapper>
      <Stack axis="y" spacing="medium">
        <Button onPress={handleExpandPress}>Expand</Button>
        <Button onPress={handleCollapsePress}>Collapse</Button>
        <Button onPress={handleClosePress}>Close</Button>
        <Button onPress={toggleCustomBackdrop}>Toggle Custom Backdrop</Button>
        <Button onPress={() => handleSnapPress(0)}>Snap To 0</Button>
        <Button onPress={() => handleSnapPress(1)}>Snap To 1</Button>
        <Button onPress={() => handleSnapPress(2)}>Snap To 2</Button>
      </Stack>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        onAnimate={handleSheetAnimate}
        backdropComponent={renderBackdrop}
      >
        <ContentContainer axis="y" spacing="large">
          <Text variant="headingM" align="center">
            Awesome Bottom Sheet
          </Text>
          <Button
            onPress={handleClosePress}
            accessibilityHint="Double tap to close the bottom sheet"
          >
            Close
          </Button>
        </ContentContainer>
      </BottomSheet>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$regular',
});

const ContentContainer = styled(Stack, {
  padding: '$large',
  zIndex: 1,
});
