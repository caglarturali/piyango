/**
 * MainMenu component styles.
 */
import { Theme } from '@material-ui/core';
import { drawerWidth } from '../../styles';

export default (theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});
