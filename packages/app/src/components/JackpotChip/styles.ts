/**
 * JackpotChip component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette, spacing, typography }: Theme) =>
  createStyles({
    currency: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: typography.pxToRem(20),
      paddingLeft: spacing(0.5),
    },
    chipOutlined: {
      color: palette.primary.dark,
      borderColor: palette.primary.dark,
    },
    chip: {
      fontWeight: typography.fontWeightMedium,
    },
  });
