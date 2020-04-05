/**
 * TicketView component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ custom, spacing, typography }: Theme) =>
  createStyles({
    root: {
      fontFamily: custom.typography.monospace,
      fontSize: typography.pxToRem(20),
    },
    item: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      userSelect: 'none',
      marginBottom: spacing(2),
    },
    colName: {
      marginRight: spacing(1),
    },
    numbers: {
      fontFamily: custom.typography.monospace,
    },
    secondary: {
      fontSize: typography.pxToRem(18),
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
