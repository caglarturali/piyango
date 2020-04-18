/**
 * DrawDisplay->Actions->RollingTexts component.
 */
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { Game } from '@caglarturali/piyango-common';

export interface RollingTextsProps {
  game: Game;
  rollingTexts: string[];
}

const RollingTexts: React.FunctionComponent<RollingTextsProps> = ({
  game,
  rollingTexts,
}) => {
  useEffect(() => {
    const options = {
      strings: rollingTexts,
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      smartBackspace: true,
    };
    const typed = new Typed(`#typed-${game.id}`, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span id={`typed-${game.id}`}></span>;
};

export default RollingTexts;
