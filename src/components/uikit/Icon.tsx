import { memo } from 'react';
import { SvgXml } from 'react-native-svg';
import type { ViewStyle } from 'react-native';

import * as icons from '~design-system/icons';
import { useTheme, Theme } from '~styles';

export type IconName = icons.IconsToken;

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
