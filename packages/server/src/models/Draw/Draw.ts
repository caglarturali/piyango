import fs from 'fs';
import fetch from 'node-fetch';
import stripBom from 'strip-bom';
import {
  DateFormat,
  DateUtils,
  DrawDataType,
  DrawDate,
  GameID,
} from '@caglarturali/piyango-common';
import { messages, MPI_BASE } from '../../constants';
import { PathUtils } from '../../utils';

interface PromiseResult {
  data?: any;
  error?: string;
}

/**
 * Draw class.
 */
export default class Draw {
  private gameId: GameID;
  private drawDate: DrawDate;

  drawData?: DrawDataType;
  error?: string;

  constructor(gameId: GameID, drawDate: DrawDate) {
    this.gameId = gameId;
    this.drawDate = drawDate;
  }

  /**
   * Populates drawData field with static data (if found)
   * and returns an instance.
   * @param gameId Game ID
   * @param drawDate Draw date
   * @returns Draw instance.
   */
  static fromFile(gameId: GameID, drawDate: DrawDate): Draw {
    const draw = new this(gameId, drawDate);
    const resPath = PathUtils.drawResourcePath(gameId, drawDate);

    if (fs.existsSync(resPath)) {
      const drawData = JSON.parse(fs.readFileSync(resPath).toString());
      draw.drawData = drawData;
    }
    return draw;
  }

  /**
   * Fetches results from the web service.
   */
  async fetchData() {
    const urls = this.buildDrawDetailsUrls();

    const results: PromiseResult[] = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          return {
            error: messages.error(
              `${response.status} - ${response.statusText}`,
            ),
          };
        }

        const text = await response.text();
        const json = JSON.parse(stripBom(text));

        if (this.gameId === GameID.piyango) {
          /**
           * Lottery.
           */
          const dateOriginal = json.cekilisTarihi;
          const dateNew = DateUtils.convert(
            dateOriginal,
            DateFormat.API,
            DateFormat.FRIENDLY,
          );

          // Append new fields.
          json.cekilisTarihi = dateNew;
          json.cekilisTarihiRaw = dateOriginal;

          return { data: json };
        } else {
          /**
           * Regular game.
           * Return only the "data" field.
           */
          const { data } = json;
          return { data };
        }
      }),
    );

    results.forEach(({ error, data }) => {
      if (error) this.error = error;
      if (data) this.drawData = data;
    });

    if (!(this.drawData || this.error)) {
      // Request is not fullfilled so far.
      this.error = messages.resNotFound();
    }
  }

  /**
   * Builds the urls for draw details resource.
   */
  private buildDrawDetailsUrls(): string[] {
    return this.buildResourceNames().map(
      (rName) => `${MPI_BASE}/cekilisler/${this.gameId}/${rName}`,
    );
  }

  /**
   * Builds resource names array based on game id and draw data.
   */
  private buildResourceNames(): string[] {
    const resourceNames = [`${this.drawDate}.json`];

    // Edge case that needs to be covered!
    if (this.gameId === GameID.sayisal) {
      resourceNames.push(`SAY_${this.drawDate}.json`);
    }
    return resourceNames;
  }
}
