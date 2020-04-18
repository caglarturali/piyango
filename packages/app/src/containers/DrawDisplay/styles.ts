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
    pointer: {
      cursor: 'pointer',
    },
    // Header.
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: spacing(2),
      paddingBottom: 0,
    },
    signature: {
      display: 'flex',
      flexDirection: 'column',
      '&>*': {
        display: 'inline-block',
        padding: 0,
        margin: 0,
      },
    },
    drawDate: {
      color: palette.secondary.main,
      fontSize: typography.pxToRem(13),
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '-0.2px',
    },
    gameName: {
      color: palette.text.primary,
      fontSize: typography.pxToRem(20),
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '-0.3px',
    },
    // Numbers area.
    numbers: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: `${spacing(3)}px 0`,
    },
    plus: {
      color: orange.A400,
      fontSize: typography.pxToRem(20),
      fontWeight: typography.fontWeightMedium,
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
      [breakpoints.down('xs')]: {
        paddingLeft: spacing(0.5),
        paddingRight: spacing(0.5),
      },
    },
    // Actions area.
    actions: {
      display: 'flex',
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
    // Details area.
    piyangoTopRow: {
      height: typography.pxToRem(36),
      verticalAlign: 'bottom',
    },
    piyangoCell: {
      color: palette.text.secondary,
      fontSize: typography.pxToRem(13),
      fontWeight: typography.fontWeightMedium,
      borderBottom: 'none',
      paddingBottom: 0,
    },
    piyangoBottomRow: {
      height: 'auto',
    },
    piyangoNumbers: {
      padding: `${spacing(1)}px 0`,
      display: 'flex',
      flexWrap: 'wrap',
    },
  });
