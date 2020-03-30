/**
 * MainLayout styles.
 */
import { Theme } from '@material-ui/core';

export const drawerWidth = 256;

export default ({ breakpoints, spacing, mixins }: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: spacing(2),
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: mixins.toolbar,
  content: {
    flexGrow: 1,
  },
});
