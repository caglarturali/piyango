/**
 * Container component.
 */
import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

const Container: React.FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Decide spacing based on screen size.
  const spacing = fullScreen ? 0 : 2;

  return (
    <Box className={classes.content}>
      <Grid container spacing={spacing}>
        {children}
      </Grid>
    </Box>
  );
};

export default Container;
