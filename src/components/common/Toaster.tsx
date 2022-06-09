import React from 'react';
import ToastContainer, { ToastConfigParams } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

import { styled, useTheme, Color } from '~styles/styled';
import { IconName } from '~components/uikit/Icon';
import { Stack, Text, Icon } from '~components/uikit';

type Props = ToastConfigParams<{
  icon?: IconName;
}>;

const toastConfig = {
  success: ({ text1, text2, props }: Props) => (
    <Toast
      variant="success"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
  error: ({ text1, text2, props }: Props) => (
    <Toast
      variant="error"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
  info: ({ text1, text2, props }: Props) => (
    <Toast
      variant="info"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
};

export default function Toaster() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const topOffset = insets.top + theme.space.small;

  return <ToastContainer config={toastConfig} topOffset={topOffset} />;
}

export function showToast({
  title,
  subtitle,
  icon,
  type,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  type: 'info' | 'success' | 'error';
}) {
  ToastContainer.show({
    text1: title,
    text2: subtitle,
    props: { icon },
    type,
  });
}

type Variant = 'info' | 'success' | 'error';

function Toast({
  title,
  subtitle,
  variant,
  icon,
}: {
  title: string;
  subtitle?: string;
  variant: Variant;
  icon?: IconName;
}) {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const color = variantToColor[variant];
  const iconName = icon || variantToIcon[variant];
  const hasIcon = !!iconName;

  return (
    <ToastWrapper
      hasIcon={hasIcon}
      style={{ maxWidth: dimensions.width - theme.space.large }}
    >
      <Stack axis="x" spacing="small" align="center">
        {hasIcon && <Icon name={iconName} size={24} color={color} />}

        <Stack axis="y" spacing="none" align="center">
          <Text variant="bodySmall" color={color} numberOfLines={1}>
            {title}
          </Text>

          {!!subtitle && (
            <Text variant="caption" color="textMuted" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </Stack>
      </Stack>
    </ToastWrapper>
  );
}

const variantToColor: { [variant in Variant]: Color } = {
  info: 'text',
  error: 'errorText',
  success: 'successText',
};

const variantToIcon: { [variant in Variant]?: IconName } = {
  error: 'warningTriangle',
  success: 'checkmark',
};

const ToastWrapper = styled('View', {
  borderRadius: '$full',
  paddingVertical: '$small',
  paddingHorizontal: '$xlarge',
  backgroundColor: '$elevated',
  elevation: 10,
  shadow: 'large',
  variants: {
    hasIcon: {
      true: { paddingLeft: '$normal' },
      false: { paddingLeft: '$xlarge' },
    },
  },
});
