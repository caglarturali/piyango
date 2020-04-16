/**
 * MainMenu component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import Color from 'color';
import { drawerWidth } from '../../styles';

export default ({
  breakpoints,
  custom,
  typography,
  palette,
  spacing,
  mixins,
}: Theme) =>
  createStyles({
    drawer: {
      [breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    brand: {
      backgroundColor: custom.palette.drawerTop,
      fontFamily: custom.typography.cursive,
      fontSize: typography.pxToRem(24),
      color: Color.rgb(palette.common.white).darken(0.1).string(),
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      height: '64px',
      paddingLeft: spacing(2),
    },
    categoryHeader: {
      paddingTop: spacing(2),
      paddingBottom: spacing(2),
    },
    categoryHeaderPrimary: {
      color: Color.rgb(palette.common.white).darken(0.1).string(),
      fontSize: typography.body2.fontSize,
    },
    item: {
      paddingTop: spacing(1),
      paddingBottom: spacing(1),
      color: Color.rgb(palette.common.white).darken(0.25).string(),
      cursor: 'pointer',
    },
    active: {
      color: custom.palette.activeLink,
    },
    itemActionable: {
      '&:hover': {
        color: palette.common.white,
        backgroundColor: Color.rgb(palette.primary.main).darken(0.2).string(),
      },
    },
    itemPrimary: {
      color: 'inherit',
      fontSize: typography.fontSize,
    },
    divider: {
      marginTop: spacing(1),
    },
    dividerBottom: {
      marginBottom: spacing(1),
    },
  });
