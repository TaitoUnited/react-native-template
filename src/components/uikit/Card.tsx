import { StyleSheet } from 'react-native';

import { styled } from '~styles';

export const Card = styled('View', {
  backgroundColor: '$surface',
  borderRadius: '$regular',
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '$line3',
  padding: '$regular',
  shadow: 'small',
});
