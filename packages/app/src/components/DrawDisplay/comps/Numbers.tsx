/**
 * DrawDisplay->Numbers component.
 */
import React from 'react';
import { Column, Game, GameID } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LuckyBall from '../../LuckyBall';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface NumbersProps {
  game: Game;
  numbers: Column;
}

const Numbers: React.FunctionComponent<NumbersProps> = ({ game, numbers }) => {
  const classes = useStyles();
  const { main, plus } = numbers;

  const renderNumbers = (nums: number[], poolKey: keyof Column) => {
    return nums.map((n, i) => (
      <LuckyBall
        num={n}
        pad={game.id !== GameID.piyango}
        key={`${game.id}-${poolKey}-number-${n}-${i}`}
      />
    ));
  };

  return (
    <Box className={classes.numbers}>
      {renderNumbers(main, 'main')}
      {plus && <span className={classes.plus}>+</span>}
      {plus && renderNumbers(plus, 'plus')}
    </Box>
  );
};

export default Numbers;
