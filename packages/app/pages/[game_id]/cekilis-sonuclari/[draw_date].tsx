/**
 * /:gameId/:cekilis-sonuclari/:drawDate
 */
import React from 'react';
import moment from 'moment';
import { NextPage, NextPageContext } from 'next';
import {
  DATE_FORMAT,
  DATE_FORMAT_VIEW,
  DrawDataType,
  Game,
  GameID,
  GAMES,
} from '@caglarturali/piyango-common';
import DrawView from '../../../src/views/DrawView';
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
  const game = GAMES.find((g) => g.id === gameId) as Game;

  return (
    <MainLayout contentTitle={game.name}>
      <DrawView gameId={gameId} drawData={drawData} />
    </MainLayout>
  );
};

DrawDetailsPage.getInitialProps = async (context: NextPageContext) => {
  const { game_id, draw_date } = context.query;

  // Convert draw date string into standard form.
  const drawDate = moment(draw_date, DATE_FORMAT_VIEW).format(DATE_FORMAT);
  const gameId = game_id as GameID;

  const data = await API.getDrawDetails(gameId, drawDate);

  return {
    gameId,
    drawData: data,
  };
};

export default DrawDetailsPage;
