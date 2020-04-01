/**
 * HomeView component.
 */
import React from 'react';
import { DrawsItem } from '@caglarturali/piyango-common';
import withMobileDialog, {
  InjectedProps,
} from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';

export interface HomeViewProps {
  draws: DrawsItem[];
}

const HomeView: React.FunctionComponent<HomeViewProps & InjectedProps> = ({
  draws,
  fullScreen,
}) => {
  // Decide spacing based on screen size.
  const spacing = fullScreen ? 0 : 2;

  return (
    <Container>
      <Grid container spacing={spacing}>
        {draws.map((draw: DrawsItem) => (
          <Grid item xs={12} lg={6} key={`draw-display-${draw.id}`}>
            <DrawDisplay drawItem={draw} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default withMobileDialog({ breakpoint: 'xs' })(HomeView);
