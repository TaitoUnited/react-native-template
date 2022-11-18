import * as stitches from './styled';

const { styled, css, createTheme, useTheme, theme, ThemeProvider, darkTheme } =
  stitches;

export type {
  Theme,
  Color,
  Space,
  Radii,
  LineHeight,
  Typography,
} from './styled';

export { themeProp, getTextTypographyVariants } from './helpers';
export { styled, css, createTheme, useTheme, theme, ThemeProvider, darkTheme };
