/**
 * MainMenu component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { drawerWidth } from '../styles';

export default ({ breakpoints, custom, typography, palette }: Theme) =>
  createStyles({
    drawer: {
      [breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    brand: {
      fontFamily: custom.typography.cursive,
      fontSize: typography.pxToRem(24),
      color: palette.text.secondary,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '64px',
    },
  });
