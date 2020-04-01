/**
 * DrawDisplay component.
 */
import React, { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  DrawDataType,
  Game,
  GameID,
  GAMES,
  ProcessDraw,
} from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Header from './comps/Header';
import Numbers from './comps/Numbers';
import Actions, { ActionItem } from './comps/Actions';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import CheckCouponIcon from '@material-ui/icons/PlaylistAddCheck';
import CopyIcon from '@material-ui/icons/FileCopy';
import styles from './styles';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import VideoIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles(styles);

export interface DrawDisplayProps {
  gameId: GameID;
  drawData: DrawDataType;
  isSummary?: boolean;
}

const DrawDisplay: React.FunctionComponent<DrawDisplayProps> = ({
  gameId,
  drawData,
  isSummary = true,
}) => {
  const classes = useStyles();

  // Get game object.
  const game = GAMES.find((g) => g.id === gameId) as Game;

  const processed = useMemo(() => {
    return new ProcessDraw(gameId, drawData);
  }, [gameId, drawData]);

  const actions: ActionItem[][] = [
    [
      {
        title: 'Yorumlar',
        icon: CommentIcon,
        disabled: false,
      },
    ],
    [
      {
        title: 'Kupon Kontrolü',
        icon: CheckCouponIcon,
        disabled: false,
      },
      {
        title: 'Panoya Kopyala',
        icon: CopyIcon,
        disabled: false,
      },
    ],
  ];

  return (
    <Card elevation={0} className={classes.root}>
      <Header
        game={game}
        drawDate={drawData.cekilisTarihi}
        jackpot={processed.jackpot()}
      />
      <Link
        href="/[gameId]/[subPage]/[drawDate]"
        as={`/${gameId}/cekilis-sonuclari/${processed.drawDate()}`}
      >
        <Box className={clsx({ [classes.pointer]: isSummary })}>
          <Numbers game={game} numbers={processed.winningNumbers()} />
        </Box>
      </Link>
      <Actions
        game={game}
        actions={actions}
        rollingTexts={processed.rollingTexts()}
      />
    </Card>
  );
};

export default DrawDisplay;
