/**
 * MuiCard override.
 */
import { Theme } from '@material-ui/core';
import { borderColor } from '../helpers';

export default ({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    borderRadius: 0,
    borderBottom: `1px solid ${borderColor(palette)}`,
    padding: `${spacing(1)}px 0`,
    [breakpoints.up('sm')]: {
      borderRadius: spacing(0.5),
      border: `1px solid ${borderColor(palette)}`,
    },
  },
});
