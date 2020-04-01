/**
 * Container component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ breakpoints, spacing }: Theme) =>
  createStyles({
    content: {
      [breakpoints.up('sm')]: {
        padding: spacing(2),
      },
    },
  });
