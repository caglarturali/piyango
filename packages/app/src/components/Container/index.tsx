/**
 * Container component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import styles from './styles';

const useStyles = makeStyles(styles);

const Container: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.content}>{children}</div>;
};

export default Container;
