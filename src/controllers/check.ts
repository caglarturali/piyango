/**
 * Check numbers controller.
 */

import { GameID } from '../models/GameID';
import { GAMES } from '../constants';
import ApiResponse from '../models/ApiResponse';
import { getDrawDetails } from './draws';
import { validDate, validGameId } from './_validate';
import RegularGame, { MatchTypeRegular } from '../models/RegularGame';

export const checkNumbersAgainstDraw = async (
  gameId: GameID,
  drawDate: string,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<{}>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  const { statusCode, success, error, data } = await getDrawDetails(
    gameId,
    drawDate,
  );
  if (!success && error) {
    apiResponse.setFailed(error, statusCode);
    return apiResponse;
  }

  const [draw] = data;

  let numbersArray: number[][] = [];

  switch (gameId) {
    case GameID.sayisal:
    case GameID.superloto:
    case GameID.onnumara:
      const { rakamlar, bilenKisiler } = draw as RegularGame;
      const rakamlarOrdered = rakamlar
        .split('#')
        .map((n) => parseInt(n, 10))
        .sort((a, b) => a - b);

      numbersArray = numbers.map((couponStr) =>
        couponStr
          .split('#')
          .map((numStr) => parseInt(numStr, 10))
          .sort((a, b) => a - b),
      );

      interface MatchResult {
        type: MatchTypeRegular | null;
        matched: string[];
        prize: number;
      }

      numbersArray.forEach((coupon: number[]) => {
        const matched: string[] = [];

        coupon.forEach((num) => {
          if (rakamlarOrdered.includes(num)) {
            matched.push(num.toString().padStart(2, '0'));
          }
        });

        const matchTypeStr =
          matched.length === 0
            ? MatchTypeRegular.$HIC
            : `$${matched.length}_BILEN`;

        const luckyPerson = bilenKisiler.find(
          (lucky) => lucky.tur === matchTypeStr,
        );

        apiResponse.addData({
          type: luckyPerson ? matchTypeStr : null,
          matched,
          prize: luckyPerson ? luckyPerson.kisiBasinaDusenIkramiye : 0,
        } as MatchResult);
      });
      break;

    case GameID.sanstopu:
      break;

    case GameID.piyango:
      break;
  }

  return apiResponse;
};
