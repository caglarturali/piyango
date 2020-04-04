/**
 * SectionHeader component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface SectionHeaderProps {
  title: string;
  lg?: any;
}

const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({
  title,
  lg,
  children,
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} lg={lg}>
        <div className={classes.root}>
          <span className={classes.title}>{title}</span>
          {children && <section>{children}</section>}
        </div>
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
