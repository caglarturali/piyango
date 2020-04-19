/**
 * Footer component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      padding: spacing(4),
      '& a': {
        color: palette.secondary.dark,
      },
    },
  });
