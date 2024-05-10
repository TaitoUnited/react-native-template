import FastImage, { FastImageProps } from 'react-native-fast-image';

import { useImageDimensions } from '~utils/image';

type Props = FastImageProps & {
  source: NonNullable<FastImageProps['source']>;
  // Automatically set the width and height based on the image aspect ratio
  autoSize?: { width: number } | { height: number };
};

export function Image({ source, style, autoSize, ...rest }: Props) {
  const dimensions = useImageDimensions({ source, size: autoSize });
  return <FastImage {...rest} source={source} style={[dimensions, style]} />;
}
