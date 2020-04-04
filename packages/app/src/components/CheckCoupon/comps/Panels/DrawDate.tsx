/**
 * CheckCoupon->Panels->DrawDate component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Panel, { PanelProps } from './Panel';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface DrawDatePanelProps {}

export const DrawDatePanel: React.FunctionComponent<
  PanelProps & DrawDatePanelProps
> = (props) => {
  const classes = useStyles();

  return <Panel {...props}></Panel>;
};
