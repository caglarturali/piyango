/**
 * Count component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette }: Theme) =>
  createStyles({
    originalCount: {
      display: 'none',
    },
    badge: {
      border: `2px solid ${palette.background.paper}`,
      color: palette.common.white,
      top: '10%',
      right: 0,
      zIndex: 0,
    },
  });
