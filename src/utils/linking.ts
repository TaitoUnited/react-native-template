import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';
import { Linking } from 'react-native';

import { showToast } from '~components/common/Toaster';

export async function launchUrl(
  url: string,
  type = 'website',
  message?: string
) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url).catch((error) => {
        console.log('> Failed to open url', error);
      });
    } else {
      console.log('> no support for url');

      showToast({
        title: i18n._(msg`Cannot open ${type}`),
        subtitle: message,
        type: 'error',
      });
    }
  } catch (error) {
    console.log('> Cannot open url', error);
    showToast({ title: i18n._(msg`Something went wrong`), type: 'error' });
  }
}

export function phonecall(number: string) {
  const url = `tel:${number}`;
  launchUrl(url, i18n._(msg`phone app`));
}
