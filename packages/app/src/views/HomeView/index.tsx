/**
 * HomeView component.
 */
import React from 'react';
import moment from 'moment';
import {
  DATE_FORMAT_FRIENDLY,
  DrawsItem,
  ProcessDraw,
} from '@caglarturali/piyango-common';
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

  // Sort draws in desc order.
  draws.sort((a, b) => {
    const jackpotA = new ProcessDraw(a.id, a.data).jackpot();
    const jackpotB = new ProcessDraw(b.id, b.data).jackpot();
    const dateA = moment(a.data.cekilisTarihi, DATE_FORMAT_FRIENDLY);
    const dateB = moment(b.data.cekilisTarihi, DATE_FORMAT_FRIENDLY);

    if (dateA.isSame(dateB)) {
      // Sort by jackpot amount.
      return jackpotB - jackpotA;
    } else {
      // Sort by date.
      return dateB.unix() - dateA.unix();
    }
  });

  return (
    <Container>
      <Grid container spacing={spacing}>
        {draws.map(({ id, data }: DrawsItem) => (
          <Grid item xs={12} lg={6} key={`draw-display-${id}`}>
            <DrawDisplay gameId={id} drawData={data} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default withMobileDialog({ breakpoint: 'xs' })(HomeView);
