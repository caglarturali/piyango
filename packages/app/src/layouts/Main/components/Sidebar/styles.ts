/**
 * Sidebar component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import { drawerWidth } from '../../styles';

export default ({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      [breakpoints.up('sm')]: {
        flexShrink: 0,
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
      [breakpoints.up('md')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)',
      },
    },
    root: {
      backgroundColor: palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: spacing(2),
    },
  });
