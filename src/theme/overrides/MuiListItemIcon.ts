/**
 * MuiListItemIcon override.
 */
import { Theme } from '@material-ui/core';

export default ({ spacing }: Theme) => ({
  root: {
    color: 'inherit',
    marginRight: 0,
    minWidth: spacing(5),
    '& svg': {
      fontSize: 22,
    },
  },
});
