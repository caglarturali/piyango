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

// Type alias.
export type ActionItems = PIconButtonProps[];

export interface ActionsProps {
  game: Game;
  actions: ActionItems[];
  rollingTexts: string[];
  isSummary?: boolean;
}

const Actions: React.FunctionComponent<ActionsProps> = ({
  game,
  actions,
  rollingTexts,
  isSummary = true,
}) => {
  const classes = useStyles();

  const [left, right, extra] = actions;

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
        {renderActions(left)}
        <Grid item xs className={classes.typed}>
          <RollingTexts game={game} rollingTexts={rollingTexts} />
        </Grid>
        {renderActions(right)}
        {!isSummary && renderActions(extra)}
      </Grid>
    </CardActions>
  );
};

export default Actions;
