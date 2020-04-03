/**
 * DrawDetailsView component.
 */
import React from 'react';
import { DrawDataType, GameID, GameUtils } from '@caglarturali/piyango-common';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';
import SectionHeader from '../../components/SectionHeader';
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
          <Comments game={game} drawData={drawData} />
        </Grid>
      </Container>
    </>
  );
};

export default DrawDetailsView;
