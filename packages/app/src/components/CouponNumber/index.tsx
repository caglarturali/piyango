/**
 * CouponNumber Component.
 */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface CouponNumberProps {
  num: number;
  isSelected: boolean;
  handleClick: (e: any) => void;
}

const CouponNumber: React.FunctionComponent<CouponNumberProps> = ({
  num,
  isSelected,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={handleClick}>
      <span
        className={clsx(classes.number, {
          [classes.selected]: isSelected,
        })}
      >
        {num}
      </span>
    </div>
  );
};

export default CouponNumber;
