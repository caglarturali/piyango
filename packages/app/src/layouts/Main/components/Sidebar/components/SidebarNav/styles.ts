/**
 * SidebarNav component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Color from 'color';

export default ({ custom, palette, spacing, typography }: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: spacing(2),
      paddingBottom: spacing(2),
    },
    categoryHeaderPrimary: {
      color: Color.rgb(blueGrey[800]).lighten(0.25).string(),
      fontSize: typography.body2.fontSize,
    },
    item: {
      paddingTop: spacing(1.25),
      paddingBottom: spacing(1.25),
      borderRadius: typography.pxToRem(6),
      color: Color.rgb(blueGrey[800]).lighten(0.25).string(),
      cursor: 'pointer',
    },
    active: {
      color: palette.primary.main,
    },
    itemActionable: {
      '&:hover': {
        backgroundColor: Color.rgb(blueGrey[400]).lighten(0.75).string(),
      },
    },
    itemPrimary: {
      color: 'inherit',
      fontSize: typography.fontSize,
    },
    divider: {
      marginTop: spacing(1),
    },
  });
