/**
 * DrawDisplay->Numbers component.
 */
import React from 'react';
import { Game, GameColumn, GameID } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LuckyBall from '../../LuckyBall';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface NumbersProps {
  game: Game;
  numbers: GameColumn;
}

const Numbers: React.FunctionComponent<NumbersProps> = ({ game, numbers }) => {
  const classes = useStyles();
  const { main, plus } = numbers;

  return (
    <Box className={classes.numbers}>
      {main.map((n, i) => (
        <LuckyBall
          num={n}
          pad={game.id !== GameID.piyango}
          key={`${game.id}-main-number-${n}-${i}`}
        />
      ))}
      {plus && <span className={classes.plus}>+</span>}
      {plus &&
        plus.map((n, i) => (
          <LuckyBall
            num={n}
            pad={game.id !== GameID.piyango}
            key={`${game.id}-plus-number-${n}-${i}`}
          />
        ))}
    </Box>
  );
};

export default Numbers;
