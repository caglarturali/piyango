/**
 * Container component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import withMobileDialog, {
  InjectedProps,
} from '@material-ui/core/withMobileDialog';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

const Container: React.FunctionComponent<InjectedProps> = ({
  children,
  fullScreen,
}) => {
  const classes = useStyles();

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

export default withMobileDialog({ breakpoint: 'xs' })(Container);
