import { useState } from 'react';
import { Alert } from 'react-native';
import { t } from '@lingui/macro';
import { openSettings } from 'react-native-permissions';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

import DocumentPicker, {
  DocumentPickerOptions,
} from 'react-native-document-picker';

import { usePermissions } from './permission';
import { FileUrl, Variants } from '~graphql/generated';

export type ReactNativeFile = {
  uri: string;
  type: string;
  name: string;
};

type Callbacks = {
  onDone?: (image: ReactNativeFile) => any;
  onError?: (error: any) => any;
};

const PHOTO_OPTIONS: Options = {
  mediaType: 'photo',
  cropping: true,
  forceJpg: true,
  width: 2000,
  height: 2000,
};

export function useImagePicker(opts: Options & Callbacks = {}) {
  const [image, setImage] = useState<ReactNativeFile>();
  const { request } = usePermissions();

  function clearImage() {
    setImage(undefined);
  }

  async function pickImage() {
    try {
      const result = await request('photo');

      if (result === 'granted') {
        const pickedImage = await ImagePicker.openPicker({
          ...PHOTO_OPTIONS,
          ...opts,
        });

        const img: ReactNativeFile = {
          uri: pickedImage.path,
          type: pickedImage.mime,
          name: pickedImage.filename || 'image.jpg',
        };

        setImage(img);
        opts.onDone?.(img);
      } else {
        Alert.alert(
          t`Unable to open image picker`,
          t`You need to update the permission in the system settings.`,
          [
            { text: t`Close`, style: 'cancel' },
            { text: t`Open settings`, onPress: openSettings },
          ],
        );
      }
    } catch (error) {
      console.log('> Failed to pick a photo', error);
      opts.onError?.(error);
    }
  }

  return { image, pickImage, clearImage };
}

export function useDocumentPicker(
  opts: DocumentPickerOptions<'ios' | 'android'> & Callbacks = {},
) {
  const [document, setDocument] = useState<ReactNativeFile>();

  function clearDocument() {
    setDocument(undefined);
  }

  async function pickDocument(documentType: keyof typeof DocumentPicker.types) {
    try {
      const pickedDoc = await DocumentPicker.pickSingle({
        type: documentType,
        presentationStyle: 'fullScreen',
        ...opts,
      });

      const doc: ReactNativeFile = {
        uri: pickedDoc.uri,
        type: pickedDoc.type as string,
        name: pickedDoc.name,
      };

      opts.onDone?.(doc);
    } catch (error) {
      console.log('> Failed to pick a document', error);
      opts.onError?.(error);
    }
  }

  return { document, pickDocument, clearDocument };
}

export function parsePhotoUrl(url: FileUrl, variant?: keyof Variants): string {
  if (variant && url?.variantUrl?.[variant]) {
    return url.variantUrl[variant] || '';
  } else {
    return url.originalUrl;
  }
}
