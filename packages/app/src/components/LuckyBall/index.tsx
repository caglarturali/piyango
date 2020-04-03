/**
 * LuckyBall component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface LuckyBallProps {
  num: number;
  pad?: boolean;
}

const LuckyBall: React.FunctionComponent<LuckyBallProps> = ({
  num,
  pad = true,
}) => {
  const classes = useStyles();
  const numStr = pad ? num.toString().padStart(2, '0') : num.toString();

  return (
    <Box className={classes.root} aria-label={numStr}>
      {numStr}
    </Box>
  );
};

export default LuckyBall;
