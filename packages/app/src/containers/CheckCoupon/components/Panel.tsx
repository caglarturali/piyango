/**
 * CheckCoupon->Panel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../styles';

const useStyles = makeStyles(styles);

export enum PanelID {
  DrawDate = 'DrawDate',
  Report = 'Report',
  UserNumbers = 'UserNumbers',
}

export interface PanelProps {
  id: PanelID;
  heading: string;
  secondaryHeading?: string;
  expandedPanel: string;
  disabled?: boolean;
  actions?: React.ReactElement;
  onPanelChange: (e: any) => void;
}

const Panel: React.FunctionComponent<PanelProps> = ({
  id,
  heading,
  secondaryHeading,
  expandedPanel,
  disabled = false,
  onPanelChange,
  actions,
  children,
}) => {
  const classes = useStyles();

  const expanded = id === expandedPanel;

  const handleChange = () => {
    if (expanded) {
      onPanelChange(null);
      return;
    }
    onPanelChange(id);
  };

  return (
    <ExpansionPanel
      expanded={expanded}
      disabled={disabled}
      onChange={handleChange}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <span className={classes.panelHeading}>
          <Typography className={classes.heading}>{heading}</Typography>
          {secondaryHeading && (
            <Typography className={classes.secondaryHeading}>
              {secondaryHeading}
            </Typography>
          )}
        </span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      {actions && (
        <ExpansionPanelActions className={classes.actions}>
          {actions}
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
};

export default Panel;
