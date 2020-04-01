/**
 * DrawDisplay->Actions component.
 */
import React, { useCallback } from 'react';
import { Game } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import styles from '../styles';
import RollingTexts from './RollingTexts';

const useStyles = makeStyles(styles);

export interface ActionItem {
  title: string;
  icon: React.ElementType;
  disabled: boolean;
  handler?: () => void;
}

export interface ActionsProps {
  game: Game;
  actions: ActionItem[][];
  rollingTexts: string[];
}

const Actions: React.FunctionComponent<ActionsProps> = ({
  game,
  actions,
  rollingTexts,
}) => {
  const classes = useStyles();

  const [actionsLeft, actionsRight] = actions;

  const renderActions = useCallback((items: ActionItem[]) => {
    return items.map(({ title, icon: Icon, disabled, handler }, i) => (
      <Grid item key={`action-button-${i}`}>
        <Tooltip title={title}>
          <Box>
            <IconButton
              disabled={disabled}
              onClick={handler}
              color="default"
              aria-label={title}
            >
              <Icon />
            </IconButton>
          </Box>
        </Tooltip>
      </Grid>
    ));
  }, []);

  return (
    <CardActions className={classes.actions} disableSpacing>
      <Grid container spacing={1} alignItems="center">
        {renderActions(actionsLeft)}
        <Grid item xs className={classes.typed}>
          <RollingTexts game={game} rollingTexts={rollingTexts} />
        </Grid>
        {renderActions(actionsRight)}
      </Grid>
    </CardActions>
  );
};

export default Actions;
