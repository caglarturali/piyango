/**
 * DisqusComments Component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ spacing }: Theme) =>
  createStyles({
    content: {
      padding: spacing(2),
      width: '100%',
    },
  });
