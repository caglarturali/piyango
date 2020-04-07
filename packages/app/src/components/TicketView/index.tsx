/**
 * TicketView component.
 */
import React from 'react';
import { Column, RegularGame, Ticket } from '@caglarturali/piyango-common';
import { DrawUtils } from '@caglarturali/piyango-utils';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface TicketViewProps {
  game: RegularGame;
  tickets: Ticket[];
  secondary?: React.ReactElement[];
}

const TicketView: React.FunctionComponent<TicketViewProps> = ({
  game,
  tickets,
  secondary = [],
}) => {
  const classes = useStyles();

  const renderTicketLine = (
    col: Column,
    colKey: string,
    secondLine?: React.ReactElement,
  ) => {
    return (
      <Grid item xs={12} key={`ticket-line-${colKey}`}>
        <Box className={classes.item}>
          <Box>
            <span color="primary" className={classes.colName}>
              {colKey}.
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

  const renderTicket = ({ numbers }: Ticket, index: number) => {
    return (
      <React.Fragment key={`ticket-${index}`}>
        <Grid className={classes.ticket}>
          {Object.keys(numbers).map((colKey) => {
            const col = numbers[colKey];
            return renderTicketLine(col, colKey, secondary[index]);
          })}
        </Grid>
        <Box className={classes.divider} />
      </React.Fragment>
    );
  };

  return <Box>{tickets.map((ticket, i) => renderTicket(ticket, i))}</Box>;
};

export default TicketView;
