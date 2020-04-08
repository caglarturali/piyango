/**
 * CouponDisplay component.
 */
import React from 'react';
import {
  Column,
  NumbersPool,
  Pool,
  RegularGame,
} from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CouponNumber from './comps/CouponNumber';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface CouponDisplayProps {
  game: RegularGame;
  userNumbers: Column;
  handleNumberClick: (n: number, k: keyof Pool, m: number) => void;
}

const CouponDisplay: React.FunctionComponent<CouponDisplayProps> = ({
  game,
  userNumbers,
  handleNumberClick,
}) => {
  const classes = useStyles();

  const isNumberSelected = (num: number, poolKey: keyof Column) => {
    const numbers = userNumbers[poolKey];
    if (numbers) {
      return numbers.includes(num);
    }
    return false;
  };

  const renderPool = <T extends NumbersPool, K extends keyof (Pool | Column)>(
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

  const { main, plus } = game.pool;

  return (
    <Box>
      {renderPool(main, 'main')}
      {plus && renderPool(plus, 'plus')}
    </Box>
  );
};

export default CouponDisplay;
