/**
 * DrawDetailsView component.
 */
import React from 'react';
import {
  DateFormat,
  DateUtils,
  DrawDataType,
  GameID,
  RegularDrawData,
} from '@caglarturali/piyango-common';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';
import SectionHeader from '../../components/SectionHeader';
import { DrawVideo } from '../../components/DrawVideo';

export interface DrawDetailsViewProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawDetailsView: React.FunctionComponent<DrawDetailsViewProps> = ({
  gameId,
  drawData,
}) => {
  const drawDate = DateUtils.convert(
    drawData.cekilisTarihi,
    DateFormat.FRIENDLY,
    DateFormat.API,
  );

  let vidSubtitle = '';
  if (gameId !== GameID.piyango) {
    const { hafta } = drawData as RegularDrawData;
    vidSubtitle = `Çekiliş No: ${hafta}`;
  }

  return (
    <>
      <SectionHeader title="Çekiliş Sonuçları" />
      <Container>
        <Grid item xs={12} lg={6}>
          <DrawDisplay gameId={gameId} drawData={drawData} isSummary={false} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <DrawVideo
            gameId={gameId}
            drawDate={drawDate}
            title="Çekiliş Videosu"
            subtitle={vidSubtitle}
          />
        </Grid>
      </Container>
    </>
  );
};

export default DrawDetailsView;
