/**
 * DrawDisplay component.
 */
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  DateFormat,
  DrawDataType,
  Game,
  GameID,
} from '@caglarturali/piyango-common';
import { ProcessDraw } from '@caglarturali/piyango-utils';
import copy from 'copy-to-clipboard';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import CheckCouponIcon from '@material-ui/icons/PlaylistAddCheck';
import CopyIcon from '@material-ui/icons/FileCopy';
import VideoIcon from '@material-ui/icons/Videocam';
import styles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './comps/Header';
import Numbers from './comps/Numbers';
import Actions, { ActionItems } from './comps/Actions';
import Details from './comps/Details';
import CheckCoupon from '../CheckCoupon';
import { Segments } from '../../shared';
import { withCount } from '../Disqussion/Count';
import { useGlobalDispatch } from '../../contexts/global';
import { showSnackbar } from '../../store/global';

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
  const dispatch = useGlobalDispatch();

  const [expanded, setExpanded] = useState(!isSummary);
  const [showCheckCoupon, setShowCheckCoupon] = useState(false);

  const processed = useMemo(() => {
    return new ProcessDraw(game.id, drawData);
  }, [game, drawData]);

  const handleVideoClick = () => {
    const slug = game.embedSlug || game.id;
    const drawDate = processed.drawDateF(DateFormat.API);
    const videoUrl = `http://millipiyango.mediatriple.net/?gamenamedate=${slug}_${drawDate}`;
    const width = 720;
    const height = 405;

    window.open(
      videoUrl,
      `video_window_${Date.now()}`,
      `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}`,
    );
  };

  const actions: ActionItems[][] = [
    [
      [
        {
          title: 'Yorumlar',
          icon: withCount(CommentIcon)({
            game,
            drawDate: processed.drawDateF(DateFormat.API),
          }),
        },
      ],
      [
        {
          title: 'Kupon Kontrolü',
          icon: <CheckCouponIcon />,
          handlers: {
            onClick: () => {
              if (game.id === GameID.piyango) {
                dispatch(
                  showSnackbar({
                    show: true,
                    message: 'Bu özellik henüz kullanılamıyor.',
                    severity: 'info',
                  }),
                );
              } else {
                setShowCheckCoupon(true);
              }
            },
          },
        },
        {
          title: 'Panoya Kopyala',
          icon: <CopyIcon />,
          handlers: {
            onClick: () => {
              copy(processed.clipboard());
              dispatch(
                showSnackbar({
                  show: true,
                  message: 'Panoya kopyalandı.',
                }),
              );
            },
          },
        },
      ],
    ],
    [
      [
        {
          title: 'Çekiliş Videosu',
          icon: <VideoIcon />,
          handlers: {
            onClick: () => handleVideoClick(),
          },
        },
      ],
      [
        {
          title: 'Çekiliş Detayları',
          icon: <ExpandMoreIcon />,
          className: clsx('expand', { ['expandOpen']: expanded }),
          handlers: {
            onClick: () => setExpanded(!expanded),
          },
        },
      ],
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
      {/* Details panel */}
      {!isSummary && (
        <Details
          gameId={game.id}
          expanded={expanded}
          report={processed.report()}
          drawData={drawData}
        />
      )}
      {/* CheckCoupon comp */}
      {showCheckCoupon && (
        <CheckCoupon
          show={showCheckCoupon}
          game={game}
          drawDate={processed.drawDateF(DateFormat.API)}
          handleClose={() => {
            setShowCheckCoupon(false);
          }}
        />
      )}
    </Card>
  );
};

export default DrawDisplay;
