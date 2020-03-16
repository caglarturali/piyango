/**
 * Games constants.
 */
import Game, { GameID } from '../models/Game';

export const GAMES: Game[] = [
  {
    id: GameID.sayisal,
    name: 'Sayısal LOTO',
    embedSlug: 'sayisalloto',
    columns: 8,
    pool: [
      {
        select: 6,
        from: 49,
      },
    ],
    drawDates: [
      {
        weekday: 6,
        since: '20180106',
      },
      {
        weekday: 3,
        since: '20180718',
      },
    ],
  },
  {
    id: GameID.superloto,
    name: 'Süper LOTO',
    columns: 6,
    pool: [
      {
        select: 6,
        from: 54,
      },
    ],
    drawDates: [
      {
        weekday: 4,
        since: '20180104',
      },
    ],
  },
  {
    id: GameID.sanstopu,
    name: 'Şans Topu',
    columns: 5,
    pool: [
      {
        select: 5,
        from: 34,
      },
      {
        select: 1,
        from: 14,
      },
    ],
    drawDates: [
      {
        weekday: 3,
        since: '20180103',
      },
    ],
  },
  {
    id: GameID.onnumara,
    name: 'On Numara',
    columns: 5,
    pool: [
      {
        select: 10,
        from: 80,
      },
    ],
    drawDates: [
      {
        weekday: 1,
        since: '20180101',
      },
    ],
  },
  {
    id: GameID.piyango,
    name: 'Milli Piyango',
    embedSlug: 'millipiyango',
    lottery: true,
  },
];
