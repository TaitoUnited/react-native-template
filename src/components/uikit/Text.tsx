import { styled, themeProp, getTextTypographyVariants } from '~styles';

export const Text = styled('Text', getTextTypographyVariants(), {
  color: '$text',
  variants: {
    ...themeProp('color', 'colors', (color) => ({
      color,
    })),
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    uppercase: {
      true: { textTransform: 'uppercase' },
      false: { textTransform: 'none' },
    },
  },
});
