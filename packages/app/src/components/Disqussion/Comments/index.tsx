/**
 * DisqusComments Component.
 */
import React from 'react';
import { DrawDate, Game } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { DiscussionEmbed } from 'disqus-react';
import { getDisqusConfig } from '../Disqus';
import { disqus } from '../../../configs';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface CommentsProps {
  game: Game;
  drawDate: DrawDate;
}

const Comments: React.FunctionComponent<CommentsProps> = ({
  game,
  drawDate,
}) => {
  const classes = useStyles();
  const { shortname } = disqus;

  return (
    <Card elevation={0}>
      <Box className={classes.content}>
        <DiscussionEmbed
          shortname={shortname}
          config={getDisqusConfig(game, drawDate)}
        />
      </Box>
    </Card>
  );
};

export default Comments;
