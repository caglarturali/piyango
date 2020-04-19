/**
 * CheckCoupon component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ custom, palette, spacing, typography }: Theme) =>
  createStyles({
    // Layout styles.
    appBar: {
      position: 'relative',
      userSelect: 'none',
    },
    toolbarRoot: {
      paddingRight: 0,
    },
    flex: {
      flex: 1,
    },
    mainArea: {
      padding: `${spacing(2)}px 0`,
      width: '100%',
    },
    // Panels
    panelHeading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    heading: {
      fontSize: typography.pxToRem(15),
      fontWeight: typography.fontWeightRegular,
    },
    secondaryHeading: {
      fontSize: typography.pxToRem(15),
      color: palette.text.secondary,
    },
    actions: {
      color: palette.text.secondary,
    },
    // Draw date panel styles
    dateForm: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },
    formControl: {
      flex: 1,
      width: '100%',
    },
    // Report panel styles
  });
