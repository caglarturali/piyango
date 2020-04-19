/**
 * JackpotChip component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

const chipColor = (palette: Theme['palette']) => {
  const { secondary, type } = palette;
  return secondary[type === 'dark' ? 'light' : 'dark'];
};

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
      color: chipColor(palette),
      borderColor: palette.secondary.main,
    },
    chip: {
      fontWeight: typography.fontWeightMedium,
    },
  });
