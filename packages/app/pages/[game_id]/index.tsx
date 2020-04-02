/**
 * /:gameId
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { GameID, GameUtils } from '@caglarturali/piyango-common';
import MainLayout from '../../src/layouts/MainLayout';
import SectionHeader from '../../src/components/SectionHeader';

export interface GameHomeProps {
  gameId: GameID;
}

const GameHome: NextPage<GameHomeProps> = ({ gameId }) => {
  const game = GameUtils.getGameById(gameId);

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
