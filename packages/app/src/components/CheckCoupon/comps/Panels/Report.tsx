/**
 * CheckCoupon->Panels->ReportPanel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Column,
  MatchText,
  RegularDrawData,
  RegularGame,
} from '@caglarturali/piyango-common';
import {
  MoneyUtils,
  RegularCheck,
  TicketUtils,
} from '@caglarturali/piyango-utils';
import Panel, { PanelProps } from '../Panel';
import TicketView from '../../../TicketView';
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

  const check = RegularCheck.fromColumns(game, drawData, userNumbers);
  check.validate();
  check.process();
  const { results } = check;

  const secondary = results.map(({ type, prize }) => (
    <>
      <span>{type ? (type as MatchText).short : ''}</span>
      <span>{new MoneyUtils(prize).format(2, true)}</span>
    </>
  ));

  const tickets = new TicketUtils(game, userNumbers).tickets();

  return (
    <Panel {...props}>
      <TicketView game={game} tickets={tickets} secondary={secondary} />
    </Panel>
  );
};
