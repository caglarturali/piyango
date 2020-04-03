/**
 * DrawVideo component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    content: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    video: {
      width: '100%',
    },
  });
