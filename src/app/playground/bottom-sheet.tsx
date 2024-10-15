import RNBottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';

import { BottomSheet, Button, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function BottomSheets() {
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const bottomSheetRef = useRef<RNBottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);

  return (
    <Wrapper>
      <Stack axis="y" spacing="medium">
        <Button onPress={handleOpenPress}>Open</Button>
        <Button onPress={handleClosePress}>Close</Button>
        <Button onPress={() => snapeToIndex(0)}>Snap To 0</Button>
        <Button onPress={() => snapeToIndex(1)}>Snap To 1</Button>
        <Button onPress={() => snapeToIndex(2)}>Snap To 2</Button>
      </Stack>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
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
