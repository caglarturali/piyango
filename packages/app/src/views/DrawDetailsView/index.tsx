/**
 * DrawDetailsView component.
 */
import React from 'react';
import moment from 'moment';
import {
  DATE_FORMAT,
  DATE_FORMAT_FRIENDLY,
  DrawDataType,
  GameID,
  RegularDrawData,
} from '@caglarturali/piyango-common';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';
import SectionHeader from '../../components/SectionHeader';
import { DrawVideo } from '../../components/DrawVideo';

export interface DrawViewProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawDetailsView: React.FunctionComponent<DrawViewProps> = ({
  gameId,
  drawData,
}) => {
  const drawDate = moment(drawData.cekilisTarihi, DATE_FORMAT_FRIENDLY).format(
    DATE_FORMAT,
  );

  let subtitle = '';
  if (gameId !== GameID.piyango) {
    const { hafta } = drawData as RegularDrawData;
    subtitle = `Çekiliş No: ${hafta}`;
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
            subtitle={subtitle}
          />
        </Grid>
      </Container>
    </>
  );
};

export default DrawDetailsView;
