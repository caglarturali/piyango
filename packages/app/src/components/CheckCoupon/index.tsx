/**
 * CheckCoupon component.
 */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  DrawDate,
  Game,
  GameColumn,
  RegularGame,
} from '@caglarturali/piyango-common';
import CheckCouponLayout from './comps/Layout';
import { DrawDatePanel, ReportPanel, UserNumbersPanel } from './comps/Panels';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface CheckCouponProps {
  game: Game;
  drawDate: DrawDate;
}

const CheckCoupon: React.FunctionComponent<CheckCouponProps> = ({
  game,
  drawDate: drawDateProp,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [panelExpanded, setPanelExpanded] = useState('user-numbers');
  const [drawDate, setDrawDate] = useState<DrawDate>(drawDateProp);
  const [userNumbers, setUserNumbers] = useState<GameColumn[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CheckCouponLayout
      title={`${game.name} Kupon Kontrolü`}
      show={open}
      handleClose={handleClose}
      handleReset={() => {}}
    >
      <DrawDatePanel
        id="draw-date"
        heading="Çekiliş Tarihi"
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
        game={game}
        selectedDate={drawDate}
        onDateChange={setDrawDate}
      />
      <UserNumbersPanel
        id="user-numbers"
        heading="Tahminleriniz"
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
        game={game as RegularGame}
      />
      <ReportPanel
        id="report-panel"
        heading="Rapor"
        disabled={userNumbers.length === 0}
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
      />
    </CheckCouponLayout>
  );
};

export default CheckCoupon;
