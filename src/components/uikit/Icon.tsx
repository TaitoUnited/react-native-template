import { memo } from 'react';
import type { AccessibilityProps, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useUnistyles } from 'react-native-unistyles';

import * as icons from '~design-system/icons';
import { type Color } from '~styles/styled';

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  color?: Color;
  size?: number;
  style?: ViewStyle;
};

export const Icon = memo(function Icon({
  name,
  color = 'text',
  size = 24,
  style,
  ...rest
}: Props & AccessibilityProps) {
  const { theme } = useUnistyles();
  const iconColor = theme.colors[color];
  return (
    <SvgXml
      {...rest}
      xml={icons[name]}
      width={size}
      height={size}
      color={iconColor}
      style={style}
    />
  );
});
