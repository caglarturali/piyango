/**
 * MainMenu component styles.
 */
import { Theme } from '@material-ui/core';
import { drawerWidth } from '../styles';

export default (theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  brand: {
    fontFamily: "'Gugi', cursive",
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.grey.A700,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
  },
});
