import fetch from 'node-fetch';
import {
  DateFormat,
  DateUtils,
  DrawDate,
  Game,
  GameID,
  GAMES,
} from '@caglarturali/piyango-common';
import { EmbedResponse } from '.';
import { messages, STREAM_URL } from '../../constants';

export default class Embed {
  private gameId: GameID;
  private drawDate: DrawDate;

  constructor(gameId: GameID, drawDate: DrawDate) {
    this.gameId = gameId;
    this.drawDate = drawDate;
  }

  /**
   * Returns HLS stream of the draw (if found).
   * Otherwise, it returns a dummy stream.
   */
  async getStream(): Promise<EmbedResponse> {
    const game = GAMES.find((g) => g.id === this.gameId) as Game;
    const gameStr = game.embedSlug || game.id;

    // Build stream id.
    const dateStr = DateUtils.convert(
      this.drawDate,
      DateFormat.API,
      DateFormat.EMBED,
    );
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
          error: messages.resNotFound(),
        };
      }
    }

    // Process contents of the .m3u8 file.
    const text = await response.text();
    const contents = this.prependWithBaseUrl(text, streamBaseUrl);

    return {
      status: 200,
      contents,
      header: ['content-type', 'application/vnd.apple.mpegurl'],
    };
  }

  /**
   * Processes text to prepend resource names
   * with absolute urls.
   * @param text Raw text
   * @param baseUrl Url to prepend with
   */
  private prependWithBaseUrl(text: string, baseUrl: string): string {
    return text
      .split('\n')
      .map((line: string) => {
        if (line === '') return;
        if (line.startsWith('#')) return line;
        return `${baseUrl}/${line}`;
      })
      .join('\n');
  }
}
