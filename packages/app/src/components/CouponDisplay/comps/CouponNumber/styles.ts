/**
 * CouponNumber Component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

const bgProp = (color: string) => {
  const lg = `linear-gradient(${color}, ${color})`;
  return `${lg}, ${lg}, ${lg}, ${lg}`;
};

export default ({
  custom,
  breakpoints,
  palette,
  typography,
  transitions,
}: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      cursor: 'pointer',
      userSelect: 'none',
    },
    number: {
      backgroundImage: bgProp(custom.palette.couponRed),
      backgroundRepeat: 'no-repeat',
      backgroundSize: '2px 3px',
      backgroundPosition: 'top left, top right, bottom left, bottom right',
      border: `solid ${custom.palette.couponRed}`,
      borderWidth: '2px 0',
      borderRadius: '2px',
      color: custom.palette.couponRed,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: custom.typography.condensed,
      fontSize: typography.pxToRem(14),
      fontWeight: typography.fontWeightMedium,
      width: typography.pxToRem(24),
      margin: `${typography.pxToRem(6)} ${typography.pxToRem(3)}`,
      padding: `${typography.pxToRem(4)} 0`,
      [breakpoints.down('xs')]: {
        fontSize: typography.pxToRem(18),
        width: typography.pxToRem(26),
      },
      [breakpoints.up('sm')]: {
        transition: transitions.create(['backgroundColor', 'color'], {
          duration: transitions.duration.short,
        }),
      },
    },
    selected: {
      backgroundColor: custom.palette.couponRed,
      color: palette.common.white,
    },
  });
