/**
 * Games constants.
 */
import { Game, GameID } from '../models/Game';

export const GAMES: Game[] = [
  {
    id: GameID.sayisal,
    name: 'Sayısal LOTO',
    iconText: '49',
    embedSlug: 'sayisalloto',
    columns: 8,
    pool: {
      main: {
        select: 6,
        from: 49,
      },
    },
    drawDates: [
      {
        weekday: 6,
        since: '19961116',
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
    iconText: '54',
    columns: 6,
    pool: {
      main: {
        select: 6,
        from: 54,
      },
    },
    drawDates: [
      {
        weekday: 4,
        since: '20071025',
      },
    ],
  },
  {
    id: GameID.sanstopu,
    name: 'Şans Topu',
    iconText: '+1',
    columns: 5,
    pool: {
      main: {
        select: 5,
        from: 34,
      },
      plus: {
        select: 1,
        from: 14,
      },
    },
    drawDates: [
      {
        weekday: 3,
        since: '20010620',
      },
    ],
  },
  {
    id: GameID.onnumara,
    name: 'On Numara',
    iconText: '80',
    columns: 5,
    pool: {
      main: {
        select: 10,
        from: 80,
      },
    },
    drawDates: [
      {
        weekday: 1,
        since: '20020812',
      },
    ],
  },
  {
    id: GameID.piyango,
    name: 'Milli Piyango',
    iconText: '*9',
    embedSlug: 'millipiyango',
    lottery: true,
  },
];
