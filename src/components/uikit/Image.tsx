import {
  Image as ExpoImage,
  type ImageProps,
  type ImageSource,
} from 'expo-image';
import {
  type AccessibilityProps,
  type ImageRequireSource,
  type ImageStyle,
  type StyleProp,
} from 'react-native';

import { useImageDimensions } from '~utils/image';

type Props = ImageProps & {
  source: NonNullable<ImageSource | ImageRequireSource>;
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
      contentFit="cover"
    />
  );
}
