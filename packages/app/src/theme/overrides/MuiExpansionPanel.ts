/**
 * MuiExpansionPanel override.
 */
import { Theme } from '@material-ui/core';

export default ({ custom }: Theme) => ({
  root: {
    // borderTop: `1px solid ${custom.palette.border}`,
    // borderBottom: `1px solid ${custom.palette.border}`,
    '&::before': {
      height: 0,
    },
  },
  expanded: {
    borderTop: `1px solid ${custom.palette.border}`,
    borderBottom: `1px solid ${custom.palette.border}`,
  },
});
