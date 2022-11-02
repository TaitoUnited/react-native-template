import {
  native as typographyTokens,
  Token as Typography,
} from '../design-system/typography';

import { theme, Theme } from './styled';

type ThemeKey = keyof Theme;

/**
 * Generate all variants for a given theme key, eg:
 * ```
 * themeProp('color', 'colors', (color) => ({ color }))
 * ```
 * would generate a variant prop called `color` with all color values from theme:
 * {
 *   color: {
 *     primary: { color: '$primary' },
 *     secondary: { color: '$secondary' },
 *     text: { color: '$text' },
 *     etc...
 *   }
 * }
 */
export function themeProp<P extends string, T extends ThemeKey>(
  prop: P,
  themeKey: T,
  getStyles: (token: string) => any
) {
  const values: Record<string, any> = { [prop]: {} };

  Object.values(theme[themeKey]).forEach(({ token }) => {
    values[prop][token] = getStyles(`$${token}`);
  });

  return values as {
    [prop in P]: { [token in keyof Theme[T]]: any };
  };
}

/**
 * Automatically generate Text component typography variants from design tokens.
 * Also add `withLineHeight` prop to control when to apply line height.
 * {
 *   variant: {
 *     title1: { typography: '$title1' },
 *     title2: { typography: '$title2' },
 *     body: { typography: '$body' },
 *     etc...
 *   }
 * }
 */
export function getTextTypographyVariants() {
  const typographyVariants = {} as Record<
    Typography,
    { typography: Typography }
  >;

  const compoundVariants = [] as Array<{
    variant: Typography;
    withLineHeight: boolean;
    css: any;
  }>;

  const defaultVariants: { variant: Typography; withLineHeight: boolean } = {
    variant: 'body',
    withLineHeight: false,
  };

  Object.keys(typographyTokens).forEach((v) => {
    const variant = v as Typography;

    typographyVariants[variant] = {
      typography: variant,
    };

    // Apply line height only for multiline text since by default app UI text
    // should not have a line height bigger than `1` (same as font size)
    compoundVariants.push({
      variant: variant,
      withLineHeight: true,
      css: {
        lineHeight: `$${variant}`,
      },
    });
  });

  return {
    compoundVariants,
    defaultVariants,
    variants: {
      variant: typographyVariants,
      // NOTE: styles can be empty here since we use this value in compoundVariants
      // to set the correct line height from theme based on the `variant` prop
      withLineHeight: { true: {}, false: {} },
    },
  };
}
