/**
 * DrawDisplay component.
 */
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  DrawDataType,
  GameID,
  GameUtils,
  ProcessDraw,
} from '@caglarturali/piyango-common';
import copy from 'copy-to-clipboard';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import CheckCouponIcon from '@material-ui/icons/PlaylistAddCheck';
import CopyIcon from '@material-ui/icons/FileCopy';
import styles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoIcon from '@material-ui/icons/Videocam';
import Header from './comps/Header';
import Numbers from './comps/Numbers';
import Actions, { ActionItemsExtra, ActionItemsMain } from './comps/Actions';
import Details from './comps/Details';
import { Segments } from '../../shared';

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

  const [expanded, setExpanded] = useState(!isSummary);

  // Get game object.
  const game = GameUtils.getGameById(gameId);

  const processed = useMemo(() => {
    return new ProcessDraw(gameId, drawData);
  }, [gameId, drawData]);

  const actionsMain: ActionItemsMain = {
    left: [
      {
        title: 'Yorumlar',
        icon: CommentIcon,
      },
    ],
    right: [
      {
        title: 'Kupon Kontrolü',
        icon: CheckCouponIcon,
      },
      {
        title: 'Panoya Kopyala',
        icon: CopyIcon,
        handlers: {
          onClick: () => {
            copy(processed.clipboard());
            // TODO: Show snackbar
          },
        },
      },
    ],
  };

  const actionsExtra: ActionItemsExtra = {
    video: {
      title: 'Çekiliş Videosu',
      icon: VideoIcon,
    },
    expand: {
      title: 'Çekiliş Detayları',
      icon: ExpandMoreIcon,
      className: clsx('expand', { ['expandOpen']: expanded }),
      handlers: {
        onClick: () => setExpanded(!expanded),
      },
    },
  };

  return (
    <Card elevation={0} className={classes.root}>
      <Header
        game={game}
        drawDate={drawData.cekilisTarihi}
        jackpot={processed.jackpot()}
      />
      <Link
        href={`/[game_id]/${Segments.CEKILIS_SONUCLARI}/[draw_date]`}
        as={`/${gameId}/${Segments.CEKILIS_SONUCLARI}/${processed.drawDateF()}`}
      >
        <Box className={clsx({ [classes.pointer]: isSummary })}>
          <Numbers game={game} numbers={processed.winningNumbers()} />
        </Box>
      </Link>
      <Actions
        game={game}
        actionsMain={actionsMain}
        actionsExtra={actionsExtra}
        rollingTexts={processed.rollingTexts()}
        isSummary={isSummary}
      />
      {!isSummary && (
        <Details
          gameId={gameId}
          expanded={expanded}
          report={processed.report()}
          drawData={drawData}
        />
      )}
    </Card>
  );
};

export default DrawDisplay;
