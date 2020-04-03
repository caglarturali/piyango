/**
 * DrawDisplay->Actions component.
 */
import React, { useCallback } from 'react';
import { Game } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import RollingTexts from './RollingTexts';
import PIconButton, { PIconButtonProps } from '../../PIconButton';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface ActionItemsMain {
  left: PIconButtonProps[];
  right: PIconButtonProps[];
}

export interface ActionItemsExtra {
  video: PIconButtonProps;
  expand: PIconButtonProps;
}

export interface ActionsProps {
  game: Game;
  actionsMain: ActionItemsMain;
  actionsExtra: ActionItemsExtra;
  rollingTexts: string[];
  isSummary?: boolean;
}

const Actions: React.FunctionComponent<ActionsProps> = ({
  game,
  actionsMain,
  actionsExtra,
  rollingTexts,
  isSummary = true,
}) => {
  const classes = useStyles();

  const { left, right } = actionsMain;

  const renderActions = useCallback((items: PIconButtonProps[]) => {
    return items.map((item, i) => (
      <Grid item key={`action-button-${i}`}>
        {renderAction(item)}
      </Grid>
    ));
  }, []);

  const renderAction = useCallback(
    (action: PIconButtonProps) => <PIconButton {...action} />,
    [],
  );

  return (
    <CardActions className={classes.actions} disableSpacing>
      <Grid container spacing={1} alignItems="center">
        {isSummary ? renderActions(left) : renderAction(actionsExtra.video)}
        <Grid item xs className={classes.typed}>
          <RollingTexts game={game} rollingTexts={rollingTexts} />
        </Grid>
        {renderActions(right)}
        {!isSummary && renderAction(actionsExtra.expand)}
      </Grid>
    </CardActions>
  );
};

export default Actions;
