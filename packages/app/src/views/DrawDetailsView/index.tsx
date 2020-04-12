/**
 * DrawDetailsView component.
 */
import React from 'react';
import { DateFormat, DrawDataType, GameID } from '@caglarturali/piyango-common';
import { DateUtils, GameUtils } from '@caglarturali/piyango-utils';
import Grid from '@material-ui/core/Grid';
import SectionHeader from '../../layouts/SectionHeader';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';
import { DrawVideo } from '../../components/DrawVideo';
import Comments from '../../components/Disqussion/Comments';

export interface DrawDetailsViewProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawDetailsView: React.FunctionComponent<DrawDetailsViewProps> = ({
  gameId,
  drawData,
}) => {
  const game = GameUtils.getGameById(gameId);
  const drawDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.URL,
  );

  return (
    <>
      <SectionHeader title="Çekiliş Sonuçları" />
      <Container>
        <Grid item xs={12} lg={6}>
          <DrawDisplay game={game} drawData={drawData} isSummary={false} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <DrawVideo
            gameId={gameId}
            drawData={drawData}
            title="Çekiliş Videosu"
          />
        </Grid>
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

export default DrawDetailsView;
