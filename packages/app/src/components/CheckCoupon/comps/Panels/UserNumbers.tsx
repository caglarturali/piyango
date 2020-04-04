/**
 * CheckCoupon->Panels->UserNumbers component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Panel, { PanelProps } from './Panel';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface UserNumbersProps {}

export const UserNumbersPanel: React.FunctionComponent<
  PanelProps & UserNumbersProps
> = (props) => {
  const classes = useStyles();

  return <Panel {...props}></Panel>;
};
