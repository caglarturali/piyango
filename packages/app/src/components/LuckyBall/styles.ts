/**
 * LuckyBall component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { orange, yellow } from '@material-ui/core/colors';
import Color from 'color';

const gradient = (color1: string, color2: string) => {
  return `radial-gradient(circle at 20% 20%, ${color1}, ${color2})`;
};

const ballColor = (
  palette: Theme['palette'],
): { background: string; color: string } => {
  const { common, type } = palette;

  const color1 = yellow[700];
  const color2 = orange[700];
  const textColor = common.white;

  if (type === 'dark') {
    return {
      background: gradient(
        Color.rgb(color1).darken(0.35).string(),
        Color.rgb(color2).darken(0.35).string(),
      ),
      color: Color.rgb(textColor).darken(0.1).string(),
    };
  }

  return {
    background: gradient(color1, color2),
    color: palette.common.white,
  };
};

export default ({ breakpoints, palette, spacing, typography }: Theme) =>
  createStyles({
    root: {
      ...ballColor(palette),
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: typography.pxToRem(20),
      fontWeight: typography.fontWeightMedium,
      height: typography.pxToRem(45),
      width: typography.pxToRem(45),
      margin: spacing(1),
      userSelect: 'none',
      textShadow: '0 0 2px gray',
      WebkitFontSmoothing: 'antialiased',
      [breakpoints.down('xs')]: {
        margin: spacing(0.5),
      },
    },
  });
