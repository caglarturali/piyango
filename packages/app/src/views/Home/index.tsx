/**
 * Home view.
 */
import React from 'react';
import { DrawsItem } from '@caglarturali/piyango-common';
import { ProcessDraw } from '@caglarturali/piyango-utils';
import { GameUtils } from '@caglarturali/piyango-utils';
import Grid from '@material-ui/core/Grid';
import SectionHeader from '../../layouts/components/SectionHeader';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';

export interface HomeProps {
  draws: DrawsItem[];
}

const Home: React.FunctionComponent<HomeProps> = ({ draws }) => {
  // Sort draws in desc order.
  draws.sort((a, b) => {
    const prdA = new ProcessDraw(a.id, a.data);
    const prdB = new ProcessDraw(b.id, b.data);

    if (prdA.drawDate().isSame(prdB.drawDate())) {
      // Sort by jackpot amount.
      return prdB.jackpot() - prdA.jackpot();
    } else {
      // Sort by date.
      return prdB.drawDate().unix() - prdA.drawDate().unix();
    }
  });

  return (
    <>
      <SectionHeader title="Son Çekilişler" />
      <Container>
        {draws.map(({ id, data }: DrawsItem) => (
          <Grid item xs={12} lg={6} key={`draw-display-${id}`}>
            <DrawDisplay game={GameUtils.getGameById(id)} drawData={data} />
          </Grid>
        ))}
      </Container>
    </>
  );
};

export default Home;
