import fetch from 'node-fetch';
import moment from 'moment';
import EmbedResult from '../models/EmbedResult';
import { GameID } from '../models/GameID';
import { DATE_FORMAT, DATE_FORMAT_EMBED } from '../constants';

/**
 * Returns an embeddable stream of the draw (if found).
 * Otherwise returns dummy stream.
 * @param gameId Game ID
 * @param drawDate Draw date string
 */
export const getEmbeddableStream = async (
  gameId: GameID,
  drawDate: string,
): Promise<EmbedResult> => {
  let streamId = gameId.toString();

  if (gameId === GameID.sayisal) {
    streamId = 'sayisalloto';
  } else if (gameId === GameID.piyango) {
    streamId = 'millipiyango';
  }

  const dateStr = moment(drawDate, DATE_FORMAT).format(DATE_FORMAT_EMBED);
  streamId += `_${dateStr}`;

  // Try actual stream first.
  let streamBaseUrl = `http://mtvfcntomsvod.mediatriple.net/${streamId}_hls`;
  let streamPlaylistUrl = `${streamBaseUrl}/playlist.m3u8`;

  let response = await fetch(streamPlaylistUrl, { method: 'GET' });

  if (!response.ok) {
    // Try to respond with a dummy stream instead.
    streamBaseUrl = 'http://devimages.apple.com/iphone/samples/bipbop';
    streamPlaylistUrl = `${streamBaseUrl}/bipbopall.m3u8`;

    response = await fetch(streamPlaylistUrl, { method: 'GET' });

    if (!response.ok) {
      return {
        status: 404,
        error: 'Resource not found',
        contents: null,
      } as EmbedResult;
    }
  }

  // Get contents of the .m3u8 file.
  const text = await response.text();

  // Process text to prepend resource names
  // with absolute urls.
  const finalText = text
    .split('\n')
    .map((line: string) => {
      if (line === '') return;
      if (line.startsWith('#')) return line;
      return `${streamBaseUrl}/${line}`;
    })
    .join('\n');

  return {
    status: 200,
    contents: finalText,
    error: null,
  } as EmbedResult;
};
