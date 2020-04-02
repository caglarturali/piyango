/**
 * DrawView component.
 */
import React from 'react';
import { DrawDataType, GameID } from '@caglarturali/piyango-common';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import DrawDisplay from '../../components/DrawDisplay';
import SectionHeader from '../../components/SectionHeader';

export interface DrawViewProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawView: React.FunctionComponent<DrawViewProps> = ({
  gameId,
  drawData,
}) => {
  return (
    <>
      <SectionHeader title="Çekiliş Detayları" />
      <Container>
        <Grid item xs={12} lg={6}>
          <DrawDisplay gameId={gameId} drawData={drawData} isSummary={false} />
        </Grid>
      </Container>
    </>
  );
};

export default DrawView;
