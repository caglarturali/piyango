/**
 * /:gameId
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { Game, GameID, GAMES } from '@caglarturali/piyango-common';
import MainLayout from '../../src/layouts/MainLayout';
import SectionHeader from '../../src/components/SectionHeader';

export interface GameHomeProps {
  gameId: GameID;
}

const GameHome: NextPage<GameHomeProps> = ({ gameId }) => {
  const game = GAMES.find((g) => g.id === gameId) as Game;

  return (
    <MainLayout contentTitle={game.name}>
      <SectionHeader title="Seçenekler" />
    </MainLayout>
  );
};

GameHome.getInitialProps = async (context: NextPageContext) => {
  const { game_id } = context.query;

  return {
    gameId: game_id as GameID,
  };
};

export default GameHome;
