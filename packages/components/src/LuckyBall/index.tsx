/**
 * LuckyBall component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface LuckyBallProps {
  num: number;
  pad?: boolean;
}

export const LuckyBall: React.FunctionComponent<LuckyBallProps> = ({
  num,
  pad = true,
}) => {
  const classes = useStyles();
  const numStr = pad ? num.toString().padStart(2, '0') : num.toString();
  return <div className={classes.root}>{numStr}</div>;
};
