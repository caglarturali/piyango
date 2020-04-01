/**
 * /:gameId/:subPage
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { Game, GameID, GAMES } from '@caglarturali/piyango-common';
import MainLayout from '../../../src/layouts/MainLayout';
import SectionHeader from '../../../src/components/SectionHeader';

export interface GameSubPageProps {
  gameId: GameID;
  subPage: string;
}

const GameSubPage: NextPage<GameSubPageProps> = ({ gameId, subPage }) => {
  const game = GAMES.find((g) => g.id === gameId) as Game;

  return (
    <MainLayout contentTitle={game.name}>
      <SectionHeader title={subPage} />
    </MainLayout>
  );
};

GameSubPage.getInitialProps = async (context: NextPageContext) => {
  const { gameId, subPage } = context.query;

  return {
    gameId: gameId as GameID,
    subPage: subPage.toString(),
  };
};

export default GameSubPage;
