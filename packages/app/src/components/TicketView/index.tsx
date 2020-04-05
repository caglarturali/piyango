/**
 * TicketView component.
 */
import React from 'react';
import {
  DrawUtils,
  GameColumn,
  RegularGame,
} from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface TicketViewProps {
  game: RegularGame;
  userNumbers: GameColumn[];
  secondary?: React.ReactElement[];
}

const TicketView: React.FunctionComponent<TicketViewProps> = ({
  game,
  userNumbers,
  secondary = [],
}) => {
  const classes = useStyles();

  const renderTicketLine = (
    col: GameColumn,
    i: number,
    secondLine?: React.ReactElement,
  ) => {
    const letters = 'ABCDEFGH';
    return (
      <Grid item xs={12} key={`ticket-line-${i}`}>
        <Box className={classes.item}>
          <Box>
            <span color="primary" className={classes.colName}>
              {letters[i % game.columns]}.
            </span>
          </Box>
          <Box className={classes.numbers}>
            <span>{DrawUtils.stringifyColumn(game.id, col)}</span>
            {secondLine && (
              <span className={classes.secondary}>{secondLine}</span>
            )}
          </Box>
        </Box>
      </Grid>
    );
  };

  return (
    <Grid className={classes.root}>
      {userNumbers.map((col, i) => renderTicketLine(col, i, secondary[i]))}
    </Grid>
  );
};

export default TicketView;
