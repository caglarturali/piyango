/**
 * Topbar component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ breakpoints, mixins, spacing }: Theme) =>
  createStyles({
    menuButton: {
      marginRight: spacing(2),
      [breakpoints.up('md')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: mixins.toolbar,
    flexGrow: {
      flexGrow: 1,
    },
    content: {
      justifyContent: 'center',
      width: `calc(100% - 64px)`,
    },
  });
