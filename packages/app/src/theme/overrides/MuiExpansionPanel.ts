/**
 * MuiExpansionPanel override.
 */
import { Theme } from '@material-ui/core';
import { borderColor } from '../helpers';

export default ({ palette }: Theme) => ({
  root: {
    // borderTop: `1px solid ${custom.palette.border}`,
    // borderBottom: `1px solid ${custom.palette.border}`,
    '&::before': {
      height: 0,
    },
  },
  expanded: {
    borderTop: `1px solid ${borderColor(palette)}`,
    borderBottom: `1px solid ${borderColor(palette)}`,
  },
});
