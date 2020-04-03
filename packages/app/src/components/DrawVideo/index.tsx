/**
 * DrawVideo component.
 */
import React, { useEffect, useState } from 'react';
import { DrawDate, GameID } from '@caglarturali/piyango-common';
import clsx from 'clsx';
import HLS from 'hls.js';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoIcon from '@material-ui/icons/Videocam';
import API from '../../services/API';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface DrawVideoProps {
  gameId: GameID;
  drawDate: DrawDate;
  title: string;
  subtitle?: string;
}

export const DrawVideo: React.FunctionComponent<DrawVideoProps> = ({
  gameId,
  drawDate,
  title,
  subtitle = '',
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const elementId = `embed-${gameId}-${drawDate}`;

  useEffect(() => {
    const player = document.getElementById(elementId) as HTMLVideoElement;
    const hls = new HLS();
    hls.loadSource(API.getEmbedUrl(gameId, drawDate));
    hls.attachMedia(player);
    hls.on(HLS.Events.MANIFEST_PARSED, () => {
      player.pause();
    });
  });

  return (
    <Card elevation={0}>
      <CardHeader
        avatar={
          <Avatar aria-label="video">
            <VideoIcon />
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-label="göster/gizle"
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
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
