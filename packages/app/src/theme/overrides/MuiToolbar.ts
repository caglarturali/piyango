/**
 * MuiToolbar override.
 */
import { Theme } from '@material-ui/core';
import { toolbarColor } from '../helpers';

export default ({ mixins, palette }: Theme) => ({
  root: {
    backgroundColor: toolbarColor(
      palette,
      mixins.toolbar.backgroundColor as string,
    ),
  },
});
