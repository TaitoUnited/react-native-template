import { memo } from 'react';
import type { ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import * as icons from '~design-system/icons';
import { Theme, useTheme } from '~styles';

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  color?: keyof Theme['colors'];
  forcedColor?: string; // NOTE: use this only in very special cases!!!
  size?: number;
  style?: ViewStyle;
};

export const Icon = memo(function Icon({
  name,
  color = 'text',
  forcedColor,
  size = 24,
  style,
}: Props) {
  const theme = useTheme();
  const iconColor = forcedColor || theme.colors[color];

  return (
    <SvgXml
      xml={icons[name]}
      width={size}
      height={size}
      color={iconColor}
      style={style}
    />
  );
});
