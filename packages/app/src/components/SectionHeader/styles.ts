/**
 * SectionHeader component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette, typography, spacing }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      background: palette.background.default,
      borderBottom: '1px solid #DFE3E8',
      color: palette.text.secondary,
      fontFamily: typography.fontFamily,
      fontSize: typography.pxToRem(13),
      fontWeight: typography.fontWeightMedium,
      height: typography.pxToRem(48),
      paddingBottom: spacing(1),
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      userSelect: 'none',
    },
    title: {
      display: 'inline-block',
      letterSpacing: '-0.2px',
      textTransform: 'uppercase',
    },
  });
