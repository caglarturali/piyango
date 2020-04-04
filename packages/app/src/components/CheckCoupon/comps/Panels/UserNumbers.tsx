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
import Typography from '@material-ui/core/Typography';
import Panel, { PanelProps } from './Panel';
import CouponNumber from '../../../CouponNumber';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface UserNumbersProps {
  game: RegularGame;
}

export const UserNumbersPanel: React.FunctionComponent<
  PanelProps & UserNumbersProps
> = ({ game, ...props }) => {
  const classes = useStyles();
  const [userNumbers, setUserNumbers] = useState<GameColumn>({ main: [] });

  const handleClick = (num: number, poolKey: PoolKeys, selectMax: number) => {
    let numbers = userNumbers[poolKey];

    if (!numbers) {
      numbers = [];
    }

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

  const isNumberSelected = (num: number, poolKey: PoolKeys) => {
    const numbers = userNumbers[poolKey];
    if (numbers) {
      return numbers.includes(num);
    }
    return false;
  };

  const renderPool = <T extends NumbersPool, K extends keyof Pool>(
    pool: T,
    poolKey: K,
  ) => {
    const { select, from } = pool;
    return (
      <Box>
        <Typography className={classes.poolTitle}>
          Bu kümeden <strong>{select}</strong> sayı seçin
        </Typography>

        {Array.from({ length: from }, (_, k) => k + 1).map((num) => (
          <CouponNumber
            num={num}
            key={`${game.id}-pool-${poolKey}-num-${num}`}
            handleClick={() => handleClick(num, poolKey, select)}
            isSelected={isNumberSelected(num, poolKey)}
          />
        ))}
      </Box>
    );
  };

  const { main, plus } = game.pool;

  return (
    <Panel {...props}>
      <Box>
        {renderPool(main, 'main')}
        {plus && renderPool(plus, 'plus')}
      </Box>
    </Panel>
  );
};
