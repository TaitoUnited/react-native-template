import { Image as ExpoImage, ImageProps } from 'expo-image';
import { AccessibilityProps, ImageStyle, StyleProp } from 'react-native';

import { useImageDimensions } from '~utils/image';

type Props = ImageProps & {
  source: NonNullable<ImageProps['source']>;
  style?: StyleProp<ImageStyle>;
  // Automatically set the width and height based on the image aspect ratio
  autoSize?: { width: number } | { height: number };
};

export function Image({
  source,
  style,
  autoSize,
  accessible = true,
  accessibilityRole = 'image',
  ...rest
}: Props & AccessibilityProps) {
  const dimensions = useImageDimensions({ source, size: autoSize });

  return (
    <ExpoImage
      {...rest}
      source={source}
      style={[dimensions, style]}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
    />
  );
}
