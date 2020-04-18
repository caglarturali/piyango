import { Theme } from '@material-ui/core';
import Color from 'color';

/**
 * Returns border color based on given palette.
 * @param palette Palette
 */
export const borderColor = (palette: Theme['palette']) => {
  const { type } = palette;
  const base = Color.rgb(palette.background.paper);
  if (type === 'light') {
    return base.darken(0.125).string();
  }
  return base.lighten(0.3).string();
};
