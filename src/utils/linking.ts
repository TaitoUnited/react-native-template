import { t } from '@lingui/macro';
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
        title: t`Cannot open ${type}`,
        subtitle: message,
        type: 'error',
      });
    }
  } catch (error) {
    console.log('> Cannot open url', error);
    showToast({ title: t`Something went wrong`, type: 'error' });
  }
}

export function phonecall(number: string) {
  const url = `tel:${number}`;
  launchUrl(url, t`phone app`);
}
