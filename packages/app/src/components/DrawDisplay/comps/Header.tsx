/**
 * DrawDisplay->Header component.
 */
import React from 'react';
import { Game } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JackpotChip from '../../JackpotChip';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface HeaderProps {
  game: Game;
  drawDate: string;
  jackpot: number;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  game,
  drawDate,
  jackpot,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box className={classes.signature}>
        <span className={classes.drawDate}>{drawDate}</span>
        <span className={classes.gameName}>{game.name}</span>
      </Box>
      <JackpotChip
        tooltip="Büyük İkramiye"
        jackpot={jackpot}
        variant="outlined"
      />
    </Box>
  );
};

export default Header;
