const WEIGHT_TO_FONT = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
} as const;

export function getFontFromWeight(weight: number) {
  return WEIGHT_TO_FONT[weight as FontWeightNum].toLowerCase() as FontWeightVar;
}

export function getFonts<T extends Record<string, TypographyDefinition>>(t: T) {
  const fonts = {} as Record<FontWeightVar, string>;

  Object.values(t).forEach((token) => {
    const suffix = WEIGHT_TO_FONT[token.fontWeight as FontWeightNum];
    const name = suffix.toLowerCase() as FontWeightVar;
    fonts[name] = `${token.fontFamily}-${suffix}`;
  });

  return fonts;
}

export function getFontSizes<T extends Record<string, TypographyDefinition>>(
  t: T
) {
  const fontSizes = {} as Record<keyof T, number>;

  Object.entries(t).forEach(([key, value]) => {
    fontSizes[key as keyof T] = value.fontSize;
  });

  return fontSizes;
}

export function getFontWeights<T extends Record<string, TypographyDefinition>>(
  t: T
) {
  const fontWeights = {} as Record<keyof T, string>;

  Object.entries(t).forEach(([key, value]) => {
    fontWeights[key as keyof T] = `${value.fontWeight}`;
  });

  return fontWeights;
}

export function getLineHeights<T extends Record<string, TypographyDefinition>>(
  t: T
) {
  const lineHeights = {} as Record<keyof T, number>;

  Object.entries(t).forEach(([key, value]) => {
    lineHeights[key as keyof T] = value.lineHeight * value.fontSize;
  });

  return lineHeights;
}

export function getLetterSpacings<
  T extends Record<string, TypographyDefinition>,
>(t: T) {
  const letterSpacings = {} as Record<keyof T, number>;

  Object.entries(t).forEach(([key, value]) => {
    letterSpacings[key as keyof T] = value.letterSpacing;
  });

  return letterSpacings;
}

const ANDROID_ELEVATIONS = [0, 1, 2, 4, 6, 8, 12, 16, 24];

export function getElevation(shadowRadius: number) {
  // Find closest elevation
  const elevation = ANDROID_ELEVATIONS.reduce((prev, curr) => {
    return Math.abs(curr - shadowRadius) < Math.abs(prev - shadowRadius)
      ? curr
      : prev;
  }, 0);

  return elevation;
}

export function getShadows<
  T extends Record<string, ShadowDefinition>,
  K extends Extract<keyof T, string>,
>(t: T) {
  const shadows = {} as Record<ShadowName<K>, ShadowOutput>;

  Object.entries(t).forEach(([key, value]) => {
    const k = key.replace('shadow', '').toLowerCase() as ShadowName<K>;

    shadows[k] = {
      elevation: getElevation(value.radius),
      shadowOffset: { width: value.offset.x, height: value.offset.y },
      shadowRadius: value.radius,
      shadowOpacity: value.opacity,
      shadowColor: value.color.hex,
    };
  });

  return shadows;
}

// Types ----------------------------------------------------------------------

export type TypographyDefinition = {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  textTransform: string;
  letterSpacing: number;
  lineHeight: number;
};

export type FontWeightToName = typeof WEIGHT_TO_FONT;

export type FontWeightNum = keyof FontWeightToName;

export type FontWeightVar = Lowercase<FontWeightToName[keyof FontWeightToName]>;

export type ShadowName<T extends string> = T extends `shadow${infer Name}`
  ? Lowercase<Name>
  : T;

export type ShadowDefinition = {
  boxShadow: string;
  offset: { x: number; y: number };
  radius: number;
  opacity: number;
  color: { hex: string; rgba: string };
};

export type ShadowOutput = {
  elevation: number;
  shadowOffset: { width: number; height: number };
  shadowRadius: number;
  shadowOpacity: number;
  shadowColor: string;
};
