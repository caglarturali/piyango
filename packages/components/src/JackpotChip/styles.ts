/**
 * JackpotChip component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ palette, typography }: Theme) =>
  createStyles({
    currency: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipOutlined: {
      color: palette.primary.dark,
      borderColor: palette.primary.dark,
    },
    chip: {
      fontWeight: typography.fontWeightMedium,
    },
  });
