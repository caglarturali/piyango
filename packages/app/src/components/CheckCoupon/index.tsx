/**
 * CheckCoupon component.
 */
import React, { useEffect, useState } from 'react';
import {
  DrawDataType,
  DrawDate,
  Game,
  RegularDrawData,
  RegularGame,
  Selection,
} from '@caglarturali/piyango-common';
import CheckCouponLayout from './comps/Layout';
import {
  DrawDatePanel,
  PanelID,
  ReportPanel,
  UserNumbersPanel,
} from './comps/Panels';
import { useDrawsDispatch } from '../../contexts';
import API from '../../services/API';

export interface CheckCouponProps {
  show: boolean;
  game: Game;
  drawDate: DrawDate;
}

const testData: Selection[] = [
  {
    main: [2, 5, 6, 17, 22],
    plus: [3],
  },
  {
    main: [2, 15, 16, 17, 22],
    plus: [4],
  },
  {
    main: [2, 5, 16, 22, 33],
    plus: [4],
  },
  {
    main: [2, 6, 16, 17, 22],
    plus: [4],
  },
  {
    main: [2, 14, 16, 22, 33],
    plus: [4],
  },
  {
    main: [2, 15, 16, 17, 22],
    plus: [4],
  },
  {
    main: [2, 5, 16, 22, 33],
    plus: [4],
  },
];

const CheckCoupon: React.FunctionComponent<CheckCouponProps> = ({
  show,
  game,
  drawDate: drawDateProp,
}) => {
  const defaultPanel = PanelID.UserNumbers;
  const [panelExpanded, setPanelExpanded] = useState(defaultPanel);
  const [drawDate, setDrawDate] = useState<DrawDate>(drawDateProp);
  const [drawData, setDrawData] = useState<DrawDataType>();
  const [userNumbers, setUserNumbers] = useState<Selection[]>([]);

  const dispatch = useDrawsDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await API.getDrawDetails(game.id, drawDate);
      setDrawData(data);
    };
    getData();
  }, [drawDate]);

  const handleAddUserNumbers = (numbers: Selection) => {
    setUserNumbers([...userNumbers, numbers]);
  };

  const handleClose = () => {
    dispatch({
      type: 'showCheckCoupon',
      payload: {
        checkcoupon: undefined,
      },
    });
  };

  const handleReset = () => {
    setPanelExpanded(defaultPanel);
    setDrawDate(drawDateProp);
    setUserNumbers([]);
  };

  return (
    <CheckCouponLayout
      title={`${game.name} Kupon Kontrolü`}
      show={show}
      handleClose={() => handleClose()}
      handleReset={() => handleReset()}
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
        game={game as RegularGame}
        drawData={drawData as RegularDrawData}
        userNumbers={userNumbers}
      />
    </CheckCouponLayout>
  );
};

export default CheckCoupon;
