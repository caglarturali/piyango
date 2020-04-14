/**
 * DrawVideo component.
 */
import React, { useEffect, useState } from 'react';
import {
  DateFormat,
  DrawData,
  GameID,
  RegularDrawData,
} from '@caglarturali/piyango-common';
import { DateUtils } from '@caglarturali/piyango-utils';
import clsx from 'clsx';
import HLS from 'hls.js';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoIcon from '@material-ui/icons/Videocam';
import PIconButton from '../PIconButton';
import API from '../../services/API';
import { app } from '../../configs';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface DrawVideoProps {
  gameId: GameID;
  drawData: DrawData;
  title: string;
}

export const DrawVideo: React.FunctionComponent<DrawVideoProps> = ({
  gameId,
  drawData,
  title,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const drawDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.API,
  );

  let subtitle = '';
  if (gameId !== GameID.piyango) {
    const { hafta } = drawData as RegularDrawData;
    subtitle = `Çekiliş No: ${hafta}`;
  }

  const elementId = `embed-${gameId}-${drawDate}`;

  useEffect(() => {
    const player = document.getElementById(elementId) as HTMLVideoElement;
    const hls = new HLS();
    const proxyUrl = app.videoProxy[process.env.NODE_ENV];
    const videoUrl = API.getEmbedUrl(gameId, drawDate);
    hls.loadSource(`${proxyUrl}${videoUrl}`);
    hls.attachMedia(player);
    hls.on(HLS.Events.MANIFEST_PARSED, () => {
      player.pause();
    });

    return () => hls.destroy();
  }, [expanded]);

  return (
    <Card elevation={0}>
      <CardHeader
        avatar={
          <Avatar aria-label="video">
            <VideoIcon />
          </Avatar>
        }
        action={
          <PIconButton
            title={title}
            icon={<ExpandMoreIcon />}
            className={clsx('expand', { ['expandOpen']: expanded })}
            handlers={{ onClick: () => setExpanded(!expanded) }}
          />
        }
        title={title}
        subheader={subtitle}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent classes={{ root: classes.content }}>
          <video
            className={classes.video}
            controls
            autoPlay={false}
            id={elementId}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};
