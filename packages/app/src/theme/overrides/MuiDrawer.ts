/**
 * MuiDrawer override.
 */
import { Theme } from '@material-ui/core';

export default ({ custom }: Theme) => ({
  paper: {
    backgroundColor: custom.palette.drawerBg,
  },
});
