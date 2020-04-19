import { Theme } from '@material-ui/core';
import Color from 'color';

/**
 * Returns toolbar color based on palette type.
 * @param palette Palette
 * @param defaultColor Default color
 */
export const toolbarColor = (
  palette: Theme['palette'],
  defaultColor: string,
) => {
  const { type } = palette;
  if (type === 'dark') {
    return Color.rgb(palette.background.default).darken(0.3).string();
  }
  return defaultColor;
};
