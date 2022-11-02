import { Animated, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { Icon, IconName } from '../Icon';
import { useInputLabelAnimation } from './common';
import { styled } from '~styles';

type Props = {
  value?: string;
  label: string;
  icon?: IconName;
  message?: string;
  style?: ViewStyle;
  isValid?: boolean;
  isRequired?: boolean;
  isFocused?: boolean;
  showRequiredAsterisk?: boolean;
  onPress: () => void;
};

// A button that emulates the look-n-feel of `TextInput`
export function InputButton({
  value,
  label,
  icon,
  message,
  style,
  isValid = true,
  isRequired = false,
  isFocused = false,
  showRequiredAsterisk = true,
  onPress,
}: Props) {
  const { labelStyles, measureLabel } = useInputLabelAnimation({
    isAnimated: !!value,
  });

  return (
    <Wrapper style={style}>
      <Label style={labelStyles} pointerEvents="none">
        <Text
          variant="body"
          color={isValid ? 'text' : 'error'}
          onLayout={measureLabel}
        >
          {label}
          {isRequired && showRequiredAsterisk ? '*' : ''}
        </Text>
      </Label>

      <InputWrapper focused={isFocused} valid={isValid} onPress={onPress}>
        <Input>
          {value ? (
            <Text
              variant="body"
              withLineHeight
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {value}
            </Text>
          ) : (
            <TextPlaceholder />
          )}
        </Input>

        {!!icon && (
          <InputDecoration>
            <Icon name={icon} size={20} color="textMuted" />
          </InputDecoration>
        )}
      </InputWrapper>

      {!!message && (
        <Message variant="caption" color="textMuted">
          {message}
        </Message>
      )}
    </Wrapper>
  );
}

const Wrapper = Animated.createAnimatedComponent(
  styled('View', {
    position: 'relative',
    display: 'flex',
    zIndex: 0,
  })
);

const Label = Animated.createAnimatedComponent(
  styled('View', {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  })
);

const InputWrapper = styled('TouchableOpacity', {
  position: 'relative',
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderTopRightRadius: '$normal',
  borderTopLeftRadius: '$normal',
  overflow: 'hidden',
  variants: {
    focused: {
      true: { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
      false: { backgroundColor: 'transparent' },
    },
    valid: {
      true: { borderColor: '$text' },
      false: { borderColor: '$error' },
    },
  },
});

const Input = styled('View', {
  alignItems: 'flex-end',
  flexDirection: 'row',
  minHeight: 60,
  flexGrow: 1,
  paddingHorizontal: '$small',
  paddingBottom: 10,
  paddingTop: '$medium',
});

const InputDecoration = styled('View', {
  flexCenter: 'row',
  paddingRight: '$xsmall',
});

const TextPlaceholder = styled('View', {
  height: '$lineHeights$body',
});

const Message = styled(Text, {
  marginTop: '$xsmall',
  marginLeft: '$small',
});
