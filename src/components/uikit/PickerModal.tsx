import { MutableRefObject, useEffect, useRef, useState } from 'react';
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
import { Stack } from './layout/Stack';
import { Radio } from './inputs/Radio';
import { Checkbox } from './inputs/Checkbox';
import { styled } from '~styles';

type BaseProps = {
  label: string;
  options: Array<{ label: string; value: string }>;
  isVisible: boolean;
  multiple?: boolean;
  onClose: () => void;
};

type SingleValueProps = {
  multiple?: false;
  selected: string;
  onConfirm: (option: string) => void;
};

type MultipleValueProps = {
  multiple: true;
  selected: string[];
  onConfirm: (option: string[]) => void;
};

type Props = BaseProps & (SingleValueProps | MultipleValueProps);

// Use this picker for picking options from a SHORT list of options (less than 20 options).
// You can use `PickerSheet` for longer lists.

export function PickerModal({ isVisible, onClose, ...rest }: Props) {
  const backdropAnimation = useRef(new Animated.Value(isVisible ? 1 : 0));
  const contentAnimation = useRef(new Animated.Value(isVisible ? 1 : 0));

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
      <ModalContent
        {...rest}
        onClose={handleClose}
        backdropAnimation={backdropAnimation}
        contentAnimation={contentAnimation}
      />
    </Modal>
  );
}

function ModalContent({
  label,
  options,
  multiple = false,
  selected: _selected,
  backdropAnimation,
  contentAnimation,
  onClose,
  onConfirm,
}: Omit<Props, 'isVisible'> & {
  backdropAnimation: MutableRefObject<Animated.Value>;
  contentAnimation: MutableRefObject<Animated.Value>;
}) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(_selected);

  function handleDone(value: any) {
    onConfirm(value);
    requestAnimationFrame(() => {
      onClose();
    });
  }

  function handleOptionSelect(value: string) {
    if (multiple) {
      const current = selected as string[];
      const isChecked = current.includes(value);
      const newSelected = isChecked
        ? current.filter((o) => o !== value)
        : [...current, value];

      setSelected(newSelected);
    } else {
      setSelected(value);
      setTimeout(() => {
        handleDone(value);
      }, 200);
    }
  }

  return (
    <Wrapper>
      <TouchableWithoutFeedback onPress={onClose}>
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
                    checked={selected.includes(option.value)}
                    value={option.value}
                    onChange={() => handleOptionSelect(option.value)}
                  />
                ) : (
                  <Radio
                    key={option.value}
                    label={option.label}
                    checked={selected.includes(option.value)}
                    value={option.value}
                    onChange={() => handleOptionSelect(option.value)}
                  />
                )
              )}
            </Stack>
          </ScrollView>

          <Footer>
            <ActionButton onPress={onClose}>
              <Text variant={multiple ? 'body' : 'bodyBold'}>
                {multiple ? <Trans>Cancel</Trans> : <Trans>Close</Trans>}
              </Text>
            </ActionButton>

            {multiple && (
              <ActionButton onPress={() => handleDone(selected)}>
                <Text variant="bodyBold">
                  <Trans>Done</Trans>
                </Text>
              </ActionButton>
            )}
          </Footer>
        </Stack>
      </Content>
    </Wrapper>
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
  })
);

const Content = Animated.createAnimatedComponent(
  styled('View', {
    backgroundColor: '$elevated',
    shadow: 'large',
    padding: '$medium',
    paddingBottom: 0,
    margin: '$xsmall',
    borderRadius: '$large',
    zIndex: 2,
  })
);

const Footer = styled('View', {
  flexDirection: 'row',
});

const ActionButton = styled('TouchableOpacity', {
  flex: 1,
  paddingTop: '$normal',
  paddingBottom: '$medium',
  flexCenter: 'row',
});
