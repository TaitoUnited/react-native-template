import { ImageProps } from 'expo-image';
import { useLayoutEffect, useState } from 'react';
import { Image, ImageRequireSource } from 'react-native';

export function useImageDimensions({
  source,
  size,
}: {
  source: ImageProps['source'];
  size?: { width: number } | { height: number };
}) {
  let width: number | undefined;
  if (size && 'width' in size) {
    width = size.width;
  }

  let height: number | undefined;
  if (size && 'height' in size) {
    height = size.height;
  }

  const [dimensions, setDimensions] = useState<{
    width?: number;
    height?: number;
  }>({ width, height });

  const src = typeof source === 'object' ? (source as any).uri : source;

  useLayoutEffect(() => {
    if (!width && !height) return;

    function calcAspectRatio(w: number, h: number) {
      const aspectRatio = w / h;
      setDimensions({
        width: width || aspectRatio * (height as number),
        height: height || (width as number) / aspectRatio,
      });
    }

    if (typeof src === 'string') {
      Image.getSize(src, calcAspectRatio, (err) => console.log(err));
    } else {
      const asset = Image.resolveAssetSource(src as ImageRequireSource);
      calcAspectRatio(asset.width, asset.height);
    }
  }, [src, width, height]);

  return dimensions;
}
