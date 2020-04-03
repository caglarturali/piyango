/**
 * DisqusComments Component.
 */
import React from 'react';
import {
  DateFormat,
  DateUtils,
  DrawDataType,
  Game,
} from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { DiscussionEmbed } from 'disqus-react';
import { Segments } from '../../../shared';
import { disqus } from '../../../config';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface CommentsProps {
  game: Game;
  drawData: DrawDataType;
}

export interface DisqusConfig {
  url: string;
  identifier: string;
  title: string;
}

const Comments: React.FunctionComponent<CommentsProps> = ({
  game,
  drawData,
}) => {
  const classes = useStyles();
  const { base_url, shortname } = disqus;

  const urlDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.URL,
  );

  const cfg: DisqusConfig = {
    url: `${base_url}/${game.id}/${Segments.CEKILIS_SONUCLARI}/${urlDate}`,
    identifier: `${game.id}-${urlDate}-comments`,
    title: `${game.name} ${urlDate} Tarihli Çekiliş`,
  };

  return (
    <Card elevation={0}>
      <Box className={classes.content}>
        <DiscussionEmbed shortname={shortname} config={cfg} />
      </Box>
    </Card>
  );
};

export default Comments;
