/**
 * HomeView component.
 */
import React from 'react';
import { DrawsItem } from '@caglarturali/piyango-common';
import { Container } from '@caglarturali/piyango-components';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface HomeViewProps {
  draws: DrawsItem[];
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({ draws }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={1}>
        {draws.map(({ id }) => (
          <Grid item xs={12} md={6} key={`draw-summary-${id}`}>
            <Card elevation={0}>{id}</Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeView;
