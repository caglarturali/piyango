/**
 * Coupon component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ spacing }: Theme) =>
  createStyles({
    pool: {
      width: '100%',
    },
    poolTitle: {
      marginTop: spacing(1.25),
      marginBottom: spacing(1),
    },
  });
