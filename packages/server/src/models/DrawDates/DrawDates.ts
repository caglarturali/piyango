import fs from 'fs';
import path from 'path';
import moment from 'moment';
import fetch from 'node-fetch';
import stripBom from 'strip-bom';
import {
  DateFormat,
  DrawDate,
  DrawListing,
  GameID,
} from '@caglarturali/piyango-common';
import { DRAWS_DIR_PATH, messages, MPI_BASE } from '../../constants';
import { SortOrder } from '../SortOrder';
import conf from '../../apiconfig';

export default class DrawDates {
  private gameId: GameID;
  private sort: SortOrder;
  private limit: number;
  private skip: number;

  drawDates: DrawDate[] = [];
  error?: string;

  /**
   * Creates a DrawDates instance.
   * @param gameId Game ID
   * @param limit Limit to be applied. Provide -1 for all results.
   * @param skip Number of items to be skipped
   * @param sort Sorting order
   */
  constructor(gameId: GameID, limit?: number, skip?: number, sort?: SortOrder) {
    this.gameId = gameId;
    this.limit = Math.max(limit || conf.drawdates.limit, -1);
    this.skip = Math.abs(skip || conf.drawdates.skip);
    this.sort = sort || conf.drawdates.sort;
  }

  /**
   * Collects draw dates data both from web service
   * and the static records.
   */
  async collectData() {
    this.drawDates = [];
    const response = await fetch(this.buildDrawDatesUrl(), { method: 'GET' });

    if (!response.ok) {
      this.error = messages.error(
        `${response.status} - ${response.statusText}`,
      );
      return;
    }

    try {
      const body = await response.text();
      const data: DrawListing[] = JSON.parse(stripBom(body));
      data.forEach(({ tarih }: DrawListing) => {
        // Add only "tarih" field!
        this.drawDates.push(tarih);
      });
    } catch (error) {
      this.error = error;
      return;
    }

    // Append static data.
    fs.readdirSync(path.join(DRAWS_DIR_PATH, this.gameId)).forEach(
      (fullName) => {
        // Build full path and file name (without extension).
        const fullPath = path.join(DRAWS_DIR_PATH, this.gameId, fullName);
        const extension = path.extname(fullPath);
        const fileName = path.basename(fullPath, extension);

        // Add record if not already found.
        if (!this.drawDates.includes(fileName) && extension === '.json') {
          this.drawDates.push(fileName);
        }
      },
    );

    this.sortData();
  }

  /**
   * Sorts draw dates based on order pref.
   */
  sortData() {
    this.drawDates.sort((a, b) => {
      const aDate = moment(a, DateFormat.API).unix();
      const bDate = moment(b, DateFormat.API).unix();

      return this.sort === SortOrder.ASC ? aDate - bDate : bDate - aDate;
    });
  }

  /**
   * Paginates results (if necessary)
   * and returns only paginated results.
   */
  paginateData(): DrawDate[] {
    const { limit, skip } = this;
    if (limit === -1) return this.drawDates;
    if (limit > 0) return this.drawDates.slice(skip, skip + limit);
    return this.drawDates;
  }

  /**
   * Builds draw dates url.
   */
  private buildDrawDatesUrl() {
    return `${MPI_BASE}/listCekilisleriTarihleri.php?tur=${this.gameId}`;
  }
}
