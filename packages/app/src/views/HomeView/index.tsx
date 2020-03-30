/**
 * HomeView component.
 */
import React from 'react';
import { DrawDataType } from '@caglarturali/piyango-common';
import { Container } from '@caglarturali/piyango-components';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface HomeViewProps {
  draws: DrawDataType[];
}

const HomeView: React.FunctionComponent<HomeViewProps> = ({ draws }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={1}>
        {draws.map(({ cekilisTarihi }, i) => (
          <Grid item xs={12} md={6} key={`draw-summary-${i}`}>
            <Card elevation={0}>{cekilisTarihi}</Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeView;
