import * as typographyTokens from '../design-system/typography';
import { theme, type Theme } from './styled';

type Typography = keyof typeof typographyTokens;
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
export function themeProp<P extends string, T extends ThemeKey, R>(
  prop: P,
  themeKey: T,
  getStyles: (token: string) => R
) {
  const values: Record<string, Record<string, R>> = { [prop]: {} };

  Object.values(theme[themeKey]).forEach(({ token }) => {
    values[prop][token] = getStyles(`$${token}`);
  });

  return values as {
    [K in P]: { [TK in keyof Theme[T]]: R };
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
type TypographyVariant = {
  typography: Typography;
  lineHeight: number;
};

type CompoundVariant = {
  variant: Typography;
  withLineHeight: boolean;
  css: { lineHeight: string };
};

type DefaultVariants = {
  variant: Typography;
  withLineHeight: boolean;
};

export function getTextTypographyVariants() {
  const typographyVariants: Record<Typography, TypographyVariant> =
    {} as Record<Typography, TypographyVariant>;

  const compoundVariants: CompoundVariant[] = [];

  const defaultVariants: DefaultVariants = {
    variant: 'body',
    withLineHeight: false,
  };

  (Object.keys(typographyTokens) as Typography[]).forEach((variant) => {
    typographyVariants[variant] = {
      typography: variant,
      // Apply line height only for multiline text since by default app UI text
      // should not have a line height bigger than `1` (same as font size)
      lineHeight: typographyTokens[variant].fontSize,
    };

    compoundVariants.push({
      variant,
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
