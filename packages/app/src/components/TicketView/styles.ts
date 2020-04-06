/**
 * TicketView component styles.
 */
import { createStyles, Theme } from '@material-ui/core';
import Color from 'color';

export default ({ custom, palette, spacing, typography }: Theme) =>
  createStyles({
    ticket: {
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
      color: Color.rgb(palette.text.primary).lighten(0.3).string(),
      fontFamily: typography.fontFamily,
      fontSize: typography.pxToRem(15),
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    divider: {
      borderBottom: `1px dashed ${palette.text.secondary}`,
      borderTop: `1px dashed ${palette.text.secondary}`,
      marginBottom: spacing(2),
    },
  });
