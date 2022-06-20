import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trans } from '@lingui/macro';

import {
  Animated,
  Easing,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import { Text } from './Text';
import { Stack } from './Stack';
import { Radio } from './Inputs/Radio';
import { Checkbox } from './Inputs/Checkbox';
import { styled } from '~styles';

type Props = {
  label: string;
  options: Array<{ label: string; value: string }>;
  selected?: string | string[];
  isVisible: boolean;
  multiple?: boolean;
  onClose: () => void;
  onOptionSelect: (option?: string | string[]) => void;
};

// Use this picker for picking a single option from a SHORT list of options

export function PickerModal({
  label,
  options,
  selected,
  isVisible,
  multiple = false,
  onClose,
  onOptionSelect,
}: Props) {
  const backdropAnimation = useRef(new Animated.Value(isVisible ? 1 : 0));
  const contentAnimation = useRef(new Animated.Value(isVisible ? 1 : 0));
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const selectedOptions = selected
    ? Array.isArray(selected)
      ? selected
      : [selected]
    : [];

  function animateOpen(callback?: () => void) {
    Animated.parallel([
      Animated.timing(backdropAnimation.current, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation.current, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.215, 0.61, 0.355, 1.0),
        useNativeDriver: true,
      }),
    ]).start(callback);
  }

  function animateClose(callback?: () => void) {
    Animated.parallel([
      Animated.timing(backdropAnimation.current, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnimation.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.215, 0.61, 0.355, 1.0),
        useNativeDriver: true,
      }),
    ]).start(callback);
  }

  function handleClose() {
    animateClose(() => {
      // Modal will unmount the content so try to avoid any UI glitches with `requestAnimationFrame`
      requestAnimationFrame(() => {
        onClose();
      });
    });
  }

  function handleOptionSelect(value: string) {
    if (multiple) {
      const isChecked = selectedOptions.includes(value);
      const newOptions = isChecked
        ? selectedOptions.filter((o) => o !== value)
        : [...selectedOptions, value];
      onOptionSelect(newOptions);
    } else {
      onOptionSelect(value);
      // Add a small delay so that the user can see the selected option
      setTimeout(() => handleClose(), 200);
    }
  }

  useEffect(() => {
    if (isVisible) animateOpen();
  }, [isVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <Wrapper>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Backdrop style={{ opacity: backdropAnimation.current }} />
        </TouchableWithoutFeedback>

        <Content
          style={{
            maxHeight: dimensions.height - insets.bottom - insets.top,
            opacity: contentAnimation.current,
            transform: [
              {
                translateY: contentAnimation.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          }}
        >
          <Stack axis="y" spacing="small">
            <Text variant="bodySmall">{label}</Text>

            <ScrollView
              style={{
                maxHeight: dimensions.height - insets.bottom - insets.top - 150,
              }}
            >
              <Stack axis="y" spacing="normal">
                {options.map((option) =>
                  multiple ? (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={selectedOptions.includes(option.value)}
                      value={option.value}
                      onChange={() => handleOptionSelect(option.value)}
                    />
                  ) : (
                    <Radio
                      key={option.value}
                      label={option.label}
                      checked={selectedOptions.includes(option.value)}
                      value={option.value}
                      onChange={() => handleOptionSelect(option.value)}
                    />
                  ),
                )}
              </Stack>
            </ScrollView>

            <CloseButton onPress={handleClose}>
              <Text variant="bodyBold">
                <Trans>Close</Trans>
              </Text>
            </CloseButton>
          </Stack>
        </Content>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled('SafeAreaView', {
  flex: 1,
  justifyContent: 'flex-end',
});

const Backdrop = Animated.createAnimatedComponent(
  styled('View', {
    absoluteFill: true,
    backgroundColor: '$backdrop',
    zIndex: 1,
  }),
);

const Content = Animated.createAnimatedComponent(
  styled('View', {
    backgroundColor: '$elevated',
    shadow: 'large',
    padding: '$medium',
    paddingBottom: 0,
    margin: '$xsmall',
    borderRadius: '$medium',
    zIndex: 2,
  }),
);

const CloseButton = styled('TouchableOpacity', {
  width: '100%',
  paddingTop: '$normal',
  paddingBottom: '$medium',
  flexCenter: 'row',
});
