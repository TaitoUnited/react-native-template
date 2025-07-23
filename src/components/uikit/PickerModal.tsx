import { Trans, useLingui } from '@lingui/react/macro';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  Animated,
  Easing,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { absoluteFill, flexCenter } from '~styles/utils';
import { announceForAccessibility } from '~utils/a11y';

import { Text } from './Text';
import { Checkbox } from './inputs/Checkbox';
import { Radio } from './inputs/Radio';
import { Spacer } from './layout/Spacer';
import { Stack } from './layout/Stack';

type Option = { label: string; value: string };

type BaseProps = {
  label: string;
  options: Option[];
  isVisible: boolean;
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

type AnimatedPickerProps = {
  backdropAnimation: RefObject<Animated.Value>;
  contentAnimation: RefObject<Animated.Value>;
};

export function PickerModal({ isVisible, onClose, ...rest }: Props) {
  const { t } = useLingui();
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
    animateClose(() => requestAnimationFrame(() => onClose()));
  }

  useEffect(() => {
    if (isVisible) animateOpen();
  }, [isVisible]);

  return (
    <Modal
      animationType="none"
      transparent
      visible={isVisible}
      onRequestClose={handleClose}
      accessible
      accessibilityViewIsModal
      accessibilityLabel={t`Picker Modal`}
      accessibilityHint={t`Allows you to pick an option from the list`}
    >
      {rest.multiple ? (
        <MultiplePicker
          {...rest}
          onClose={handleClose}
          backdropAnimation={backdropAnimation}
          contentAnimation={contentAnimation}
        />
      ) : (
        <SinglePicker
          {...rest}
          onClose={handleClose}
          backdropAnimation={backdropAnimation}
          contentAnimation={contentAnimation}
        />
      )}
    </Modal>
  );
}

function PickerLayout({
  children,
  backdropAnimation,
  contentAnimation,
  onClose,
}: {
  children: React.ReactNode;
  backdropAnimation: RefObject<Animated.Value>;
  contentAnimation: RefObject<Animated.Value>;
  onClose: () => void;
}) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropAnimation.current },
            absoluteFill(),
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.content,
          {
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
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

type SinglePickerProps = Omit<BaseProps, 'isVisible'> &
  SingleValueProps &
  AnimatedPickerProps;

function SinglePicker({
  label,
  options,
  selected: initialSelected,
  onClose,
  onConfirm,
  backdropAnimation,
  contentAnimation,
}: SinglePickerProps) {
  const { t } = useLingui();
  const [selected, setSelected] = useState(initialSelected);

  function handleSelect(value: string) {
    setSelected(value);
    setTimeout(() => {
      onConfirm(value);
      announceForAccessibility({ message: t`Closing with ${value}` });
      requestAnimationFrame(() => onClose());
    }, 200);
  }

  return (
    <PickerLayout
      onClose={onClose}
      backdropAnimation={backdropAnimation}
      contentAnimation={contentAnimation}
    >
      <ScrollView accessibilityRole="list">
        <Stack axis="y" spacing="regular">
          <Text variant="bodySmallSemiBold">{label}</Text>
          <FlashList
            data={options}
            extraData={selected} // Trigger re-render on selected change
            estimatedItemSize={48}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={() => <Spacer size="small" />}
            renderItem={({ item: opt }) => (
              <Radio
                label={opt.label}
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => handleSelect(opt.value)}
              />
            )}
          />
        </Stack>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, flexCenter()]}
          onPress={onClose}
          accessibilityRole="button"
        >
          <Text variant="bodyBold">
            <Trans>Close</Trans>
          </Text>
        </TouchableOpacity>
      </View>
    </PickerLayout>
  );
}

type MultiplePickerProps = Omit<BaseProps, 'isVisible'> &
  MultipleValueProps &
  AnimatedPickerProps;

function MultiplePicker({
  label,
  options,
  selected: initialSelected,
  onClose,
  onConfirm,
  backdropAnimation,
  contentAnimation,
}: MultiplePickerProps) {
  const { t } = useLingui();
  const [selected, setSelected] = useState<string[]>(initialSelected);

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function handleDone() {
    onConfirm(selected);
    announceForAccessibility({
      message: t`Closing with ${selected.join(', ')}`,
    });
    requestAnimationFrame(() => onClose());
  }

  return (
    <PickerLayout
      onClose={onClose}
      backdropAnimation={backdropAnimation}
      contentAnimation={contentAnimation}
    >
      <ScrollView accessibilityRole="list">
        <Stack axis="y" spacing="regular">
          <Text variant="bodySmallSemiBold">{label}</Text>
          <FlashList
            data={options}
            extraData={selected} // Trigger re-render on selected change
            estimatedItemSize={48}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={() => <Spacer size="small" />}
            renderItem={({ item: opt }) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                value={opt.value}
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
              />
            )}
          />
        </Stack>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, flexCenter()]}
          onPress={onClose}
          accessibilityRole="button"
        >
          <Text variant="body">
            <Trans>Cancel</Trans>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, flexCenter()]}
          onPress={handleDone}
          accessibilityRole="button"
        >
          <Text variant="bodyBold">
            <Trans>Done</Trans>
          </Text>
        </TouchableOpacity>
      </View>
    </PickerLayout>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
    padding: theme.space.medium,
    borderTopLeftRadius: theme.radii.medium,
    borderTopRightRadius: theme.radii.medium,
    zIndex: 2,
  },
  footer: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingTop: theme.space.regular,
    paddingBottom: theme.space.medium,
  },
}));
