/**
 * CheckCoupon component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette, spacing, typography }: Theme) =>
  createStyles({
    // Layout styles.
    appBarRoot: {
      background: palette.primary.dark,
      display: 'flex',
      justifyContent: 'center',
      height: '60px',
    },
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
  });
