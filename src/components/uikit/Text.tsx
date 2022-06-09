import { styled, themeProp } from '~styles';

export const Text = styled('Text', {
  color: '$text',
  variants: {
    ...themeProp('color', 'colors', (value) => ({
      color: value,
    })),
    variant: {
      body: { typography: '$body' },
      bodyBold: { typography: '$bodyBold' },
      bodySmall: { typography: '$bodySmall' },
      bodySmallBold: { typography: '$bodySmallBold' },
      bodyExtraSmall: { typography: '$bodyExtraSmall' },
      bodyExtraSmallBold: { typography: '$bodyExtraSmallBold' },
      caption: { typography: '$caption' },
      title1: { typography: '$title1' },
      title2: { typography: '$title2' },
      title3: { typography: '$title3' },
    },
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    uppercase: {
      true: { textTransform: 'uppercase' },
      false: { textTransform: 'none' },
    },
    applyLineHeight: {
      // NOTE: styles can be empty here since we use this value in compoundVariants
      // to set the correct line height from theme based on the `variant` prop
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // Apply line height only for multiline text since by default app UI text
    // should not have a line height bigger than `1` (same as font size)
    { variant: 'body', applyLineHeight: true, css: { lineHeight: '$body' } },
    { variant: 'bodyBold', applyLineHeight: true, css: { lineHeight: '$bodyBold' } }, // prettier-ignore
    { variant: 'bodySmall', applyLineHeight: true, css: { lineHeight: '$bodySmall' } }, // prettier-ignore
    { variant: 'bodySmallBold', applyLineHeight: true, css: { lineHeight: '$bodySmallBold' } }, // prettier-ignore
    { variant: 'bodyExtraSmall', applyLineHeight: true, css: { lineHeight: '$bodyExtraSmall' } }, // prettier-ignore
    { variant: 'bodyExtraSmallBold', applyLineHeight: true, css: { lineHeight: '$bodyExtraSmallBold' } }, // prettier-ignore
    { variant: 'caption', applyLineHeight: true, css: { lineHeight: '$caption' } }, // prettier-ignore
    { variant: 'title1', applyLineHeight: true, css: { lineHeight: '$title1' } }, // prettier-ignore
    { variant: 'title2', applyLineHeight: true, css: { lineHeight: '$title2' } }, // prettier-ignore
    { variant: 'title3', applyLineHeight: true, css: { lineHeight: '$title3' } }, // prettier-ignore
  ],
  defaultVariants: {
    variant: 'body',
    applyLineHeight: false,
  },
});
