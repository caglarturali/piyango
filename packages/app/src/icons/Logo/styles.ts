/**
 * Logo component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import Color from 'color';

export default ({ custom, palette, typography }: Theme) =>
  createStyles({
    brand: {
      fontFamily: custom.typography.cursive,
      fontSize: typography.pxToRem(24),
      color: Color.rgb(palette.common.white).darken(0.1).string(),
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
    },
  });
