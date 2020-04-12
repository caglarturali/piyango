import fetch from 'node-fetch';
import { DateFormat, DrawDate, GameID } from '@caglarturali/piyango-common';
import ApiResponse from '../models/ApiResponse';
import { DateUtils } from '@caglarturali/piyango-utils';

export const getCommentCountFor = async (
  gameId: GameID,
  drawDate: DrawDate,
) => {
  const resp = new ApiResponse<number>();

  const drawDateUrl = DateUtils.convert(
    drawDate,
    DateFormat.API,
    DateFormat.URL,
  );
  const id = `${gameId}-${drawDateUrl}-comments`;

  try {
    const response = await fetch(
      `https://piyango-online.disqus.com/count-data.js?1=${id}&_=${Date.now()}`,
    );
    const text = await response.text();
    if (text) {
      // Capture counts field.
      const match = text.replace(/\s/g, '').match(/\"counts\":\[(.*?)\]/);
      if (match) {
        const { comments } = JSON.parse(match[1]) as {
          id: string;
          comments: number;
        };
        resp.addData(comments);
      } else {
        throw new Error();
      }
    }
  } catch (_error) {
    resp.addData(0);
  }
  return resp;
};
