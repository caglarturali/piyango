/**
 * /:gameId/:subPage/:drawDate
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { Game, GameID, GAMES } from '@caglarturali/piyango-common';
import MainLayout from '../../../src/layouts/MainLayout';
import SectionHeader from '../../../src/components/SectionHeader';

export interface DrawDetailsPageProps {
  gameId: GameID;
  subPage: string;
  drawDate: string;
}

const DrawDetailsPage: NextPage<DrawDetailsPageProps> = ({
  gameId,
  subPage,
  drawDate,
}) => {
  const game = GAMES.find((g) => g.id === gameId) as Game;

  return (
    <MainLayout contentTitle={game.name}>
      <SectionHeader title={subPage} />
    </MainLayout>
  );
};

DrawDetailsPage.getInitialProps = async (context: NextPageContext) => {
  const { gameId, subPage, drawDate } = context.query;

  return {
    gameId: gameId as GameID,
    subPage: subPage.toString(),
    drawDate: drawDate.toString(),
  };
};

export default DrawDetailsPage;
