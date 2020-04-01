/**
 * DrawDisplay component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export default ({ breakpoints, palette, spacing, typography }: Theme) =>
  createStyles({
    root: {
      userSelect: 'none',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing(2),
      paddingBottom: 0,
    },
    drawDate: {
      color: palette.primary.dark,
      fontSize: typography.pxToRem(13),
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '-0.2px',
      padding: 0,
    },
    gameName: {
      color: palette.text.primary,
      fontSize: typography.pxToRem(20),
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '-0.3px',
      padding: 0,
    },
    numbers: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: `${spacing(3)}px 0`,
    },
    actions: {
      display: 'flex',
    },
    plus: {
      color: orange.A400,
      fontSize: typography.pxToRem(20),
      fontWeight: typography.fontWeightMedium,
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
    },
    typed: {
      color: palette.text.secondary,
      fontSize: typography.pxToRem(14),
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '0.3px',
      textAlign: 'center',
      textTransform: 'uppercase',
      [breakpoints.down('xs')]: {
        letterSpacing: '-0.2px',
      },
    },
    '@global': {
      '.typed-cursor': {
        color: orange.A400,
      },
    },
  });
