/**
 * CheckCoupon->Panels->ReportPanel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  GameColumn,
  RegularCheck,
  RegularDrawData,
  RegularGame,
} from '@caglarturali/piyango-common';
import { MoneyUtils } from '@caglarturali/piyango-utils';
import Panel, { PanelProps } from '../Panel';
import TicketView from '../../../TicketView';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface ReportPanelProps {
  game: RegularGame;
  drawData?: RegularDrawData;
  userNumbers: GameColumn[];
}

export const ReportPanel: React.FunctionComponent<
  PanelProps & ReportPanelProps
> = ({ game, drawData, userNumbers, ...props }) => {
  const classes = useStyles();

  if (!drawData) return null;

  const check = RegularCheck.fromGameColumns(game, drawData, userNumbers);
  check.validate();
  check.process();
  const { results } = check;

  const secondary = results.map(({ type, prize }) => (
    <>
      <span>{type}</span>
      <span>{new MoneyUtils(prize).format(2, true)}</span>
    </>
  ));

  return (
    <Panel {...props}>
      <TicketView
        game={game as RegularGame}
        userNumbers={userNumbers}
        secondary={secondary}
      />
    </Panel>
  );
};
