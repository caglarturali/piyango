/**
 * CheckCoupon component.
 */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  DrawDataType,
  DrawDate,
  Game,
  GameColumn,
  RegularGame,
} from '@caglarturali/piyango-common';
import CheckCouponLayout from './comps/Layout';
import {
  DrawDatePanel,
  PanelID,
  ReportPanel,
  UserNumbersPanel,
} from './comps/Panels';
import API from '../../services/API';
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
  const [panelExpanded, setPanelExpanded] = useState(PanelID.UserNumbers);
  const [drawDate, setDrawDate] = useState<DrawDate>(drawDateProp);
  const [drawData, setDrawData] = useState<DrawDataType>();
  const [userNumbers, setUserNumbers] = useState<GameColumn[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await API.getDrawDetails(game.id, drawDate);
      setDrawData(data);
    };
    getData();
  }, [drawDate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUserNumbers = (column: GameColumn) => {
    setUserNumbers([...userNumbers, column]);
  };

  return (
    <CheckCouponLayout
      title={`${game.name} Kupon Kontrolü`}
      show={open}
      handleClose={handleClose}
      handleReset={() => {}}
    >
      <DrawDatePanel
        id={PanelID.DrawDate}
        heading="Çekiliş Tarihi"
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
        game={game}
        selectedDate={drawDate}
        onDateChange={setDrawDate}
        drawData={drawData}
      />
      <UserNumbersPanel
        id={PanelID.UserNumbers}
        heading="Tahminleriniz"
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
        game={game as RegularGame}
        onAddUserNumbers={handleAddUserNumbers}
        isReportAvailable={userNumbers.length > 0}
        onReportClick={() => setPanelExpanded(PanelID.Report)}
      />
      <ReportPanel
        id={PanelID.Report}
        heading="Rapor"
        disabled={userNumbers.length === 0}
        onPanelChange={setPanelExpanded}
        expandedPanel={panelExpanded}
        game={game}
        drawData={drawData}
        userNumbers={userNumbers}
      />
    </CheckCouponLayout>
  );
};

export default CheckCoupon;
