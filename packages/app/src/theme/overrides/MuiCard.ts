/**
 * MuiCard override.
 */
import { Theme } from '@material-ui/core';

export default ({ breakpoints, custom, spacing }: Theme) => ({
  root: {
    borderRadius: 0,
    borderBottom: `1px solid ${custom.palette.border}`,
    padding: `${spacing(1)}px 0`,
    [breakpoints.up('sm')]: {
      borderRadius: spacing(0.5),
      border: `1px solid ${custom.palette.border}`,
    },
  },
});
