/**
 * GameIcon component styles.
 */
import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  iconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid currentColor`,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    // userSelect: 'none',
  },
  iconContent: {
    color: 'currentColor',
  },
});
