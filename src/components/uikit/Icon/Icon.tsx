import React from 'react';
import { SvgXml } from 'react-native-svg';
import type { ViewStyle } from 'react-native';

import * as icons from '~styles/tokens/icons';
import { useTheme, Theme } from '~styles';

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  color?: keyof Theme['colors'];
  size?: number;
  style?: ViewStyle;
};

export const Icon = React.memo(function Icon({
  name,
  color = 'text',
  size = 24,
  style,
}: Props) {
  const theme = useTheme();

  return (
    <SvgXml
      xml={icons[name]}
      width={size}
      height={size}
      color={theme.colors[color]}
      style={style}
    />
  );
});
