/**
 * /:gameId
 */
import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { GameID } from '@caglarturali/piyango-common';
import { GameUtils } from '@caglarturali/piyango-utils';
import Main from '../../src/layouts/Main';
import SectionHeader from '../../src/layouts/components/SectionHeader';

export interface GameHomeProps {
  gameId: GameID;
}

const GameHome: NextPage<GameHomeProps> = ({ gameId }) => {
  const game = GameUtils.getGameById(gameId);

  return (
    <Main contentTitle={game.name}>
      <SectionHeader title="Seçenekler" />
    </Main>
  );
};

GameHome.getInitialProps = async (context: NextPageContext) => {
  const { game_id } = context.query;

  return {
    gameId: game_id as GameID,
  };
};

export default GameHome;
