/**
 * CheckCoupon->Panels->ReportPanel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Column,
  RegularDrawData,
  RegularGame,
} from '@caglarturali/piyango-common';
import { TicketUtils } from '@caglarturali/piyango-utils';
import Panel, { PanelProps } from '../Panel';
import TicketDisplay from '../../../TicketDisplay';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface ReportPanelProps {
  game: RegularGame;
  drawData?: RegularDrawData;
  userNumbers: Column[];
}

export const ReportPanel: React.FunctionComponent<
  PanelProps & ReportPanelProps
> = ({ game, drawData, userNumbers, ...props }) => {
  const classes = useStyles();

  if (!drawData) return null;

  const ticketUtils = new TicketUtils(game, userNumbers);
  const tickets = ticketUtils.tickets();
  const checkResults = ticketUtils.compareAgainstDraw(drawData);

  // console.log(checkResults);

  return (
    <Panel {...props}>
      <div>
        {tickets.map((ticket, i) => (
          <TicketDisplay
            game={game}
            ticket={ticket}
            results={checkResults[i]}
            key={`${game.name}-ticket-${i}`}
          />
        ))}
      </div>
    </Panel>
  );
};
