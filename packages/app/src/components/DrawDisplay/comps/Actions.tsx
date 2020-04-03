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
  className?: string;
  handlers?: { [eventName: string]: (e: any) => void };
}

export interface ActionItemsMain {
  left: ActionItem[];
  right: ActionItem[];
}

export interface ActionItemsExtra {
  video: ActionItem;
  expand: ActionItem;
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

  const renderActions = useCallback((items: ActionItem[]) => {
    return items.map((item, i) => (
      <Grid item key={`action-button-${i}`}>
        {renderAction(item)}
      </Grid>
    ));
  }, []);

  const renderAction = useCallback(
    ({ title, icon: Icon, disabled, className, handlers }: ActionItem) => {
      return (
        <Tooltip title={title}>
          <Box>
            <IconButton
              disabled={disabled}
              className={className}
              color="default"
              aria-label={title}
              {...handlers}
            >
              <Icon />
            </IconButton>
          </Box>
        </Tooltip>
      );
    },
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
