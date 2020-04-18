/**
 * CheckCoupon->Panels->UserNumbers component.
 */
import React, { useState } from 'react';
import { Pool, RegularGame, Selection } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Panel, { PanelProps } from '../Panel';
import CouponDisplay from '../../../CouponDisplay';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface UserNumbersProps {
  game: RegularGame;
  isReportAvailable: boolean;
  onAddUserNumbers: (c: Selection) => void;
  onReportClick: (e: any) => void;
}

export const UserNumbersPanel: React.FunctionComponent<
  PanelProps & UserNumbersProps
> = ({
  game,
  isReportAvailable,
  onAddUserNumbers,
  onReportClick,
  ...props
}) => {
  const classes = useStyles();

  const [userNumbers, setUserNumbers] = useState<Selection>({ main: [] });

  const handleNumberClick = (
    num: number,
    poolKey: keyof Pool,
    selectMax: number,
  ) => {
    let numbers = userNumbers[poolKey];

    if (!numbers) numbers = [];

    if (numbers.includes(num)) {
      // Number has been found. Remove it from selected.
      numbers = numbers.filter((n) => n !== num);
    } else {
      // Add new number to the related pool if allowed.
      if (numbers.length < selectMax) {
        numbers.push(num);
      }
    }

    setUserNumbers({
      ...userNumbers,
      [poolKey]: numbers,
    });
  };

  const handleAddSelection = () => {
    onAddUserNumbers(userNumbers);
    setUserNumbers({ main: [] });
  };

  const isOneSelectionEntered = () => {
    const { main: mainPool, plus: plusPool } = game.pool;
    const { main: userMain, plus: userPlus } = userNumbers;

    if (userMain.length === mainPool.select) {
      if (plusPool) {
        if (userPlus?.length === plusPool.select) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  // Panel actions
  const actions = (
    <>
      <Button
        disabled={!isOneSelectionEntered()}
        onClick={() => handleAddSelection()}
      >
        <AddIcon />
        Kolon Ekle
      </Button>
      <Button disabled={!isReportAvailable} onClick={onReportClick}>
        <CheckIcon />
        Rapora Git
      </Button>
    </>
  );

  return (
    <Panel {...props} actions={actions}>
      <CouponDisplay
        game={game}
        userNumbers={userNumbers}
        handleNumberClick={handleNumberClick}
      />
    </Panel>
  );
};
