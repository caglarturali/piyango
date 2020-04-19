/**
 * SidebarNav component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import Color from 'color';

export default ({ palette, spacing, typography }: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: spacing(2),
      paddingBottom: spacing(2),
    },
    categoryHeaderPrimary: {
      color: palette.text.secondary,
      fontSize: typography.body2.fontSize,
    },
    item: {
      paddingTop: spacing(1.25),
      paddingBottom: spacing(1.25),
      borderRadius: typography.pxToRem(6),
      color: palette.text.primary,
      cursor: 'pointer',
    },
    active: {
      color: palette.secondary.main,
    },
    itemActionable: {
      '&:hover': {
        backgroundColor: palette.background.default,
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
