/**
 * TicketView component.
 */
import React from 'react';
import {
  CheckResult,
  Column,
  RegularGame,
  Ticket,
} from '@caglarturali/piyango-common';
import { DrawUtils, MoneyUtils } from '@caglarturali/piyango-utils';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface TicketViewProps {
  game: RegularGame;
  ticket: Ticket;
  results?: CheckResult[];
  showDivider?: boolean;
}

const TicketView: React.FunctionComponent<TicketViewProps> = ({
  game,
  ticket,
  results,
  showDivider = true,
}) => {
  const classes = useStyles();

  const renderTicketLine = (
    col: Column,
    colKey: string,
    result?: CheckResult,
  ) => {
    const resultLine = () => {
      if (result) {
        const { type, prize, match } = result;
        const prizeFmt = new MoneyUtils(prize).format(2, true);
        return (
          <>
            <span>{type?.short}</span>
            <span>{prizeFmt}</span>
          </>
        );
      }
    };

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
            <span className={classes.secondary}>{resultLine()}</span>
          </Box>
        </Box>
      </Grid>
    );
  };

  const renderTicket = ({ numbers }: Ticket) => {
    return (
      <>
        <Grid className={classes.ticket}>
          {Object.keys(numbers).map((colKey, i) => {
            const col = numbers[colKey];
            const res = results ? results[i] : undefined;
            return renderTicketLine(col, colKey, res);
          })}
        </Grid>
        {showDivider && <Box className={classes.divider} />}
      </>
    );
  };

  return <Box>{renderTicket(ticket)}</Box>;
};

export default TicketView;
