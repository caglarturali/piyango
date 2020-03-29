/**
 * MainMenu component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { drawerWidth } from '../styles';

export default (theme: Theme) =>
  createStyles({
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
      color: theme.palette.text.secondary,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '64px',
    },
  });
