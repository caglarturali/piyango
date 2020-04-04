/**
 * CheckCoupon->Panels->Panel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface PanelProps {
  id: string;
  heading: string;
  secondaryHeading?: string;
  expandedPanel: string;
  disabled?: boolean;
  onChange: (e: any) => void;
}

const Panel: React.FunctionComponent<PanelProps> = ({
  id,
  heading,
  secondaryHeading,
  expandedPanel,
  disabled = false,
  onChange,
  children,
}) => {
  const classes = useStyles();

  const expanded = id === expandedPanel;

  const handleChange = () => {
    if (expanded) {
      onChange('');
      return;
    }
    onChange(id);
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
    </ExpansionPanel>
  );
};

export default Panel;
