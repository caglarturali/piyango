/**
 * CheckCoupon->Panels->ReportPanel component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Panel, { PanelProps } from './Panel';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface ReportPanelProps {}

export const ReportPanel: React.FunctionComponent<
  PanelProps & ReportPanelProps
> = (props) => {
  const classes = useStyles();

  return <Panel {...props}></Panel>;
};
