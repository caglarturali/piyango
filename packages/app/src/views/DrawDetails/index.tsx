/**
 * DrawDetails view.
 */
import React from 'react';
import { DateFormat, DrawDataType, GameID } from '@caglarturali/piyango-common';
import { DateUtils, GameUtils } from '@caglarturali/piyango-utils';
import Grid from '@material-ui/core/Grid';
import SectionHeader from '../../layouts/components/SectionHeader';
import Container from '../../components/Container';
import DrawDisplay from '../../containers/DrawDisplay';
import { Comments } from '../../containers/Disqussion';
// import { DrawVideo } from '../../components/DrawVideo';

export interface DrawDetailsProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawDetails: React.FunctionComponent<DrawDetailsProps> = ({
  gameId,
  drawData,
}) => {
  const game = GameUtils.getGameById(gameId);
  const drawDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.API,
  );

  return (
    <>
      <SectionHeader title="Çekiliş Sonuçları" />
      <Container>
        <Grid item xs={12} lg={6}>
          <DrawDisplay game={game} drawData={drawData} isSummary={false} />
        </Grid>
        {/* <Grid item xs={12} lg={6}>
          <DrawVideo
            gameId={gameId}
            drawData={drawData}
            title="Çekiliş Videosu"
          />
        </Grid> */}
      </Container>
      <SectionHeader title="Yorumlar" />
      <Container>
        <Grid item xs={12} lg={6}>
          <Comments game={game} drawDate={drawDate} />
        </Grid>
      </Container>
    </>
  );
};

export default DrawDetails;
