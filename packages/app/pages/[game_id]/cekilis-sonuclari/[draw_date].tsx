/**
 * /:gameId/:cekilis-sonuclari/:drawDate
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { DateFormat, DrawDataType, GameID } from '@caglarturali/piyango-common';
import { DateUtils, GameUtils } from '@caglarturali/piyango-utils';
import DrawDetailsView from '../../../src/views/DrawDetailsView';
import MainLayout from '../../../src/layouts/MainLayout';
import API from '../../../src/services/API';

export interface DrawDetailsPageProps {
  gameId: GameID;
  drawData: DrawDataType;
}

const DrawDetailsPage: NextPage<DrawDetailsPageProps> = ({
  gameId,
  drawData,
}) => {
  const game = GameUtils.getGameById(gameId);

  return (
    <MainLayout contentTitle={game.name}>
      <DrawDetailsView gameId={gameId} drawData={drawData} />
    </MainLayout>
  );
};

DrawDetailsPage.getInitialProps = async (context: NextPageContext) => {
  const { game_id, draw_date } = context.query;

  // Convert draw date string into standard form.
  const drawDate = DateUtils.convert(
    draw_date.toString(),
    DateFormat.URL,
    DateFormat.API,
  );
  const gameId = game_id as GameID;

  const data = await API.getDrawDetails(gameId, drawDate);

  return {
    gameId,
    drawData: data,
  };
};

export default DrawDetailsPage;
