/**
 * DrawDisplay component.
 */
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { DrawDataType, Game, ProcessDraw } from '@caglarturali/piyango-common';
import copy from 'copy-to-clipboard';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import CheckCouponIcon from '@material-ui/icons/PlaylistAddCheck';
import CopyIcon from '@material-ui/icons/FileCopy';
import styles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './comps/Header';
import Numbers from './comps/Numbers';
import Actions, { ActionItems } from './comps/Actions';
import Details from './comps/Details';
import { Segments } from '../../shared';

const useStyles = makeStyles(styles);

export interface DrawDisplayProps {
  game: Game;
  drawData: DrawDataType;
  isSummary?: boolean;
}

const DrawDisplay: React.FunctionComponent<DrawDisplayProps> = ({
  game,
  drawData,
  isSummary = true,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(!isSummary);

  const processed = useMemo(() => {
    return new ProcessDraw(game.id, drawData);
  }, [game, drawData]);

  const actions: ActionItems[] = [
    [
      {
        title: 'Yorumlar',
        icon: CommentIcon,
      },
    ],
    [
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
    [
      {
        title: 'Çekiliş Detayları',
        icon: ExpandMoreIcon,
        className: clsx('expand', { ['expandOpen']: expanded }),
        handlers: {
          onClick: () => setExpanded(!expanded),
        },
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
        href={`/[game_id]/${Segments.CEKILIS_SONUCLARI}/[draw_date]`}
        as={`/${game.id}/${
          Segments.CEKILIS_SONUCLARI
        }/${processed.drawDateF()}`}
      >
        <Box className={clsx({ [classes.pointer]: isSummary })}>
          <Numbers game={game} numbers={processed.winningNumbers()} />
        </Box>
      </Link>
      <Actions
        game={game}
        actions={actions}
        rollingTexts={processed.rollingTexts()}
        isSummary={isSummary}
      />
      {!isSummary && (
        <Details
          gameId={game.id}
          expanded={expanded}
          report={processed.report()}
          drawData={drawData}
        />
      )}
    </Card>
  );
};

export default DrawDisplay;
