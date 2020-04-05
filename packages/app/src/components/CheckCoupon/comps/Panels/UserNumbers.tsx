/**
 * CheckCoupon->Panels->UserNumbers component.
 */
import React, { useState } from 'react';
import {
  GameColumn,
  NumbersPool,
  Pool,
  PoolKeys,
  RegularGame,
} from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Panel, { PanelProps } from './Panel';
import CouponNumber from '../../../CouponNumber';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface UserNumbersProps {
  game: RegularGame;
  isReportAvailable: boolean;
  onAddUserNumbers: (c: GameColumn) => void;
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
  const [userNumbers, setUserNumbers] = useState<GameColumn>({ main: [] });

  const handleNumberClick = (
    num: number,
    poolKey: PoolKeys,
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

  const handleAddGameColumn = () => {
    onAddUserNumbers(userNumbers);
    setUserNumbers({ main: [] });
  };

  const isNumberSelected = (num: number, poolKey: PoolKeys) => {
    const numbers = userNumbers[poolKey];
    if (numbers) {
      return numbers.includes(num);
    }
    return false;
  };

  const isOneColumnEntered = () => {
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

  const renderPool = <
    T extends NumbersPool,
    K extends keyof (Pool | GameColumn)
  >(
    pool: T,
    poolKey: K,
  ) => {
    const { select, from } = pool;
    const selected = userNumbers[poolKey]?.length || 0;
    const remainingText =
      select - selected === 0
        ? 'Seçim tamamlandı.'
        : `Bu kümeden <strong>${select - selected}</strong> sayı seçin:`;
    return (
      <Box>
        <Typography className={classes.poolTitle}>
          <span dangerouslySetInnerHTML={{ __html: remainingText }} />
        </Typography>

        {Array.from({ length: from }, (_, k) => k + 1).map((num) => (
          <CouponNumber
            num={num}
            key={`${game.id}-pool-${poolKey}-num-${num}`}
            handleClick={() => handleNumberClick(num, poolKey, select)}
            isSelected={isNumberSelected(num, poolKey)}
          />
        ))}
      </Box>
    );
  };

  // Panel actions
  const actions = (
    <>
      <Button
        disabled={!isOneColumnEntered()}
        onClick={() => handleAddGameColumn()}
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

  const { main, plus } = game.pool;

  return (
    <Panel {...props} actions={actions}>
      <Box>
        {renderPool(main, 'main')}
        {plus && renderPool(plus, 'plus')}
      </Box>
    </Panel>
  );
};
