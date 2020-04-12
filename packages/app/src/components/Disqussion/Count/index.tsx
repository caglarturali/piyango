/**
 * Count Component.
 */
import React, { useEffect, useState } from 'react';
import { DrawDate, Game } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import styles from './styles';
import API from '../../../services/API';

const useStyles = makeStyles(styles);

export interface CountProps {
  game: Game;
  drawDate: DrawDate;
}

export const Count: React.FunctionComponent<CountProps> = ({
  game,
  drawDate,
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<number | null>(null);

  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const commentCount = await API.getCommentsCount(game.id, drawDate);
      setCount(commentCount);
      setLoading(false);
    };
    getData();
  }, []);

  return loading ? (
    <>{children}</>
  ) : (
    <Badge
      color="secondary"
      badgeContent={count}
      max={999}
      showZero
      classes={{ badge: classes.badge }}
    >
      {children}
    </Badge>
  );
};

export const withCount = (Comp: React.ElementType) => (props: CountProps) => (
  <Count {...props}>
    <Comp />
  </Count>
);
