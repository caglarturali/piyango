/**
 * Topbar component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ breakpoints, palette, mixins, spacing }: Theme) =>
  createStyles({
    toolbar: {
      // necessary for content to be below app bar
      ...mixins.toolbar,
      '&>*': {
        position: 'absolute',
      },
    },
    menuButton: {
      marginRight: spacing(2),
      [breakpoints.up('md')]: {
        display: 'none',
      },
      zIndex: 1000,
    },
    content: {
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  });
