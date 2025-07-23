import { TypographyDefinition } from './utils';

export const body: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodyBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodyExtraSmall: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 12,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodyExtraSmallBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 12,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodyLarge: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 18,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.556,
};
export const bodyLargeBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 18,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.556,
};
export const bodySemiBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodySmall: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 14,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodySmallBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 14,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const bodySmallSemiBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 14,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const displayExtraSmall: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 32,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const displayLarge: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 64,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const displaySmall: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 48,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const headingL: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 28,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const headingM: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 22,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const headingS: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const headingXl: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 42,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const headingXxl: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 72,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const label: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: 14,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const lead: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 28,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const leadBold: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 28,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const linkText: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const linkTextHover: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const overlineRegular: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 14,
  textTransform: 'uppercase',
  letterSpacing: 0,
  lineHeight: 1.5,
};
export const overlineSmall: TypographyDefinition = {
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 0,
  lineHeight: 1.5,
};

export type TypographyToken =
  | 'body'
  | 'bodyBold'
  | 'bodyExtraSmall'
  | 'bodyExtraSmallBold'
  | 'bodyLarge'
  | 'bodyLargeBold'
  | 'bodySemiBold'
  | 'bodySmall'
  | 'bodySmallBold'
  | 'bodySmallSemiBold'
  | 'displayExtraSmall'
  | 'displayLarge'
  | 'displaySmall'
  | 'headingL'
  | 'headingM'
  | 'headingS'
  | 'headingXl'
  | 'headingXxl'
  | 'label'
  | 'lead'
  | 'leadBold'
  | 'linkText'
  | 'linkTextHover'
  | 'overlineRegular'
  | 'overlineSmall';
