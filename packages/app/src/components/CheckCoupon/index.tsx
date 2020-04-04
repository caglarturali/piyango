/**
 * CheckCoupon component.
 */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCouponLayout from './comps/Layout';
import { DrawDate, Game, GameColumn } from '@caglarturali/piyango-common';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        secondaryHeading={drawDate}
        onChange={setPanelExpanded}
        expandedPanel={panelExpanded}
      />
      <UserNumbersPanel
        id="user-numbers"
        heading="Tahminleriniz"
        onChange={setPanelExpanded}
        expandedPanel={panelExpanded}
      />
      <ReportPanel
        id="report-panel"
        heading="Rapor"
        onChange={setPanelExpanded}
        expandedPanel={panelExpanded}
      />
    </CheckCouponLayout>
  );
};

export default CheckCoupon;
