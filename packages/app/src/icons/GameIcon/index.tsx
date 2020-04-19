/**
 * GameIcon component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface GameIconProps {
  content: string;
}

const GameIcon: React.FC<GameIconProps> = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.iconWrapper}>
      <span className={classes.iconContent}>{content}</span>
    </div>
  );
};

export default GameIcon;
