/**
 * Main layout styles.
 */
import { Theme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const drawerWidth = 256;

export default ({ breakpoints, spacing, mixins, transitions }: Theme) => ({
  // Global styles
  '@global': {
    '.typed-cursor': {
      color: orange.A400,
    },
    '.expand': {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: transitions.create('transform', {
        duration: transitions.duration.shortest,
      }),
    },
    '.expandOpen': {
      transform: 'rotate(180deg)',
    },
  },
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
