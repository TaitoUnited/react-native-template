import React from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';

type Props = ImageProps & {
  source: ImageSourcePropType;
  size: { width: number } | { height: number };
};

// Automatically set the width and height based on the image aspect ratio
export function ScaledImage({ source, size, style, ...rest }: Props) {
  const [dimensions, setDimensions] = React.useState<null | [number, number]>(
    null
  );

  let width: number | undefined;
  if ('width' in size) {
    width = size.width;
  }

  let height: number | undefined;
  if ('height' in size) {
    height = size.height;
  }

  const calcAspectRatio = React.useCallback(
    (w: number, h: number) => {
      const aspectRatio = w / h;
      setDimensions([
        width || aspectRatio * (height as number),
        height || (width as number) / aspectRatio,
      ]);
    },
    [width, height]
  );

  React.useEffect(() => {
    const uri = typeof source === 'object' ? (source as any).uri : null;

    if (uri) {
      Image.getSize(uri, calcAspectRatio, (err) => console.log(err));
    } else {
      const asset = Image.resolveAssetSource(source);
      calcAspectRatio(asset.width, asset.height);
    }
  }, [source, calcAspectRatio]);

  if (!width && !height) {
    throw Error('Either width or height must be given!');
  }

  return dimensions ? (
    <Image
      {...rest}
      source={source}
      style={[style, { width: dimensions[0], height: dimensions[1] }]}
    />
  ) : null;
}
