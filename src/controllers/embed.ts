import fetch from 'node-fetch';
import moment from 'moment';
import EmbedResponse from '../models/EmbedResponse';
import { GameID } from '../models/GameID';
import { DATE_FORMAT, DATE_FORMAT_EMBED, STREAM_URL } from '../constants';

/**
 * Returns an embeddable stream of the draw (if found).
 * Otherwise returns dummy stream.
 * @param gameId Game ID
 * @param drawDate Draw date string
 */
export const getEmbeddableStream = async (
  gameId: GameID,
  drawDate: string,
): Promise<EmbedResponse> => {
  let gameStr: string;

  if (gameId === GameID.sayisal) {
    gameStr = 'sayisalloto';
  } else if (gameId === GameID.piyango) {
    gameStr = 'millipiyango';
  } else {
    gameStr = gameId.toString();
  }

  // Build stream id.
  const dateStr = moment(drawDate, DATE_FORMAT).format(DATE_FORMAT_EMBED);
  const streamId = `${gameStr}_${dateStr}_hls`;

  // Try actual stream first.
  let streamBaseUrl = `${STREAM_URL.base.url}/${streamId}`;
  let streamFileUrl = `${streamBaseUrl}/${STREAM_URL.base.file}`;

  let response = await fetch(streamFileUrl, { method: 'GET' });

  if (!response.ok) {
    // Try to respond with a dummy stream instead.
    streamBaseUrl = STREAM_URL.dummy.url;
    streamFileUrl = `${streamBaseUrl}/${STREAM_URL.dummy.file}`;

    response = await fetch(streamFileUrl, { method: 'GET' });

    if (!response.ok) {
      return {
        status: 404,
        error: 'Resource not found',
        contents: null,
      } as EmbedResponse;
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
  } as EmbedResponse;
};
