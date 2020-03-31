/**
 * LuckyBall component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { orange, yellow } from '@material-ui/core/colors';

export default ({ breakpoints, palette, spacing, typography }: Theme) =>
  createStyles({
    root: {
      background: `radial-gradient(circle at 20% 20%, ${yellow[700]}, ${orange[700]})`,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: palette.common.white,
      fontSize: typography.pxToRem(20),
      fontWeight: 'bold',
      height: '44px',
      width: '44px',
      margin: spacing(1),
      userSelect: 'none',
      textShadow: '0 0 2px gray',
      WebkitFontSmoothing: 'antialiased',
      [breakpoints.down('xs')]: {
        margin: spacing(0.5),
      },
    },
  });
