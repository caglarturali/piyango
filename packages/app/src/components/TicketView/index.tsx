/**
 * TicketView component.
 */
import React from 'react';
import { GameColumn, RegularGame } from '@caglarturali/piyango-common';
import { DrawUtils } from '@caglarturali/piyango-utils';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface TicketViewProps {
  game: RegularGame;
  tickets: GameColumn[][];
  secondary?: React.ReactElement[];
}

const TicketView: React.FunctionComponent<TicketViewProps> = ({
  game,
  tickets,
  secondary = [],
}) => {
  const classes = useStyles();

  const renderTicketLine = (
    col: GameColumn,
    index: number,
    secondLine?: React.ReactElement,
  ) => {
    const letters = 'ABCDEFGH';
    return (
      <Grid item xs={12} key={`ticket-line-${index}`}>
        <Box className={classes.item}>
          <Box>
            <span color="primary" className={classes.colName}>
              {letters[index % game.columns]}.
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

  const renderTicket = (columns: GameColumn[], index: number) => {
    return (
      <React.Fragment key={`ticket-${index}`}>
        <Grid className={classes.ticket}>
          {columns.map((col, j) => renderTicketLine(col, j, secondary[index]))}
        </Grid>
        <Box className={classes.divider} />
      </React.Fragment>
    );
  };

  return <Box>{tickets.map((ticket, i) => renderTicket(ticket, i))}</Box>;
};

export default TicketView;
