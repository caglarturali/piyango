import fs from 'fs';
import path from 'path';
import moment from 'moment';
import fetch from 'node-fetch';
import stripBom from 'strip-bom';
import { GameID } from '../Game';
import { DrawDate } from './DrawDate';
import { DATE_FORMAT, DRAWS_DIR_PATH, MPI_BASE } from '../../constants';
import DrawListing from '../DrawListing';
import { SortOrder } from '../SortOrder';
import conf from '../../apiconfig';

export default class DrawDates {
  private gameId: GameID;
  private sort: SortOrder;
  private limit: number;
  private skip: number;

  drawDates: DrawDate[] = [];
  error?: string;

  constructor(gameId: GameID, limit?: number, skip?: number, sort?: SortOrder) {
    this.gameId = gameId;
    this.limit = limit || conf.drawdates.limit;
    this.skip = skip || conf.drawdates.skip;
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
      this.error = `Unable to fetch data: ${response.statusText}`;
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
      const aDate = moment(a, DATE_FORMAT).unix();
      const bDate = moment(b, DATE_FORMAT).unix();

      return this.sort === SortOrder.ASC ? aDate - bDate : bDate - aDate;
    });
  }

  /**
   * Paginates results (if necessary)
   * and returns only paginated results.
   */
  paginateData(): DrawDate[] {
    const { limit, skip } = this;
    if (limit > 0) {
      return this.drawDates.slice(skip, skip + limit);
    }
    return this.drawDates;
  }

  /**
   * Builds draw dates url.
   */
  private buildDrawDatesUrl() {
    return `${MPI_BASE}/listCekilisleriTarihleri.php?tur=${this.gameId}`;
  }
}
