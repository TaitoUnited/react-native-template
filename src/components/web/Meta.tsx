import Head from 'expo-router/head';
import { Platform } from 'react-native';

export default function Meta() {
  if (Platform.OS !== 'web') return;

  return (
    <Head>
      {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
      <title>Taito Template</title>
      <meta
        name="description"
        content="This is a template for Taito Universal Apps"
      />
    </Head>
  );
}
