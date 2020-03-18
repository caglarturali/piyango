import moment from 'moment';
import {
  buildDrawDetailsUrls,
  buildResourceNames,
  getDrawDetails,
  getDrawDetailsForLastDraw,
} from '../draws';
import { GameID } from '../../models/Game';
import RegularDraw, { DrawType } from '../../models/RegularDraw';
import { DATE_FORMAT, DATE_FORMAT_FRIENDLY, MPI_BASE } from '../../constants';

test('should get draw details for the last draw for given game', async () => {
  const { data } = await getDrawDetailsForLastDraw(GameID.superloto);
  const drawDetails = data[0] as RegularDraw;

  expect(data).toBeDefined();
  expect(data).toHaveLength(1);
  expect(drawDetails.cekilisTuru).toBe(DrawType.SUPER_LOTO);
});

test('should get draw details for given game and date', async () => {
  const dateStr = '20200312';
  const { data } = await getDrawDetails(GameID.superloto, dateStr);
  const drawDetails = data[0] as RegularDraw;

  expect(data).toBeDefined();
  expect(data).toHaveLength(1);
  expect(drawDetails.cekilisTuru).toBe(DrawType.SUPER_LOTO);
  expect(drawDetails.cekilisTarihi).toBe(
    moment(dateStr, DATE_FORMAT).format(DATE_FORMAT_FRIENDLY),
  );
});

test('should build resource names for given game and date', () => {
  const dateStr = '20200311';
  const sayRes = buildResourceNames(GameID.sayisal, dateStr);
  const sansRes = buildResourceNames(GameID.sanstopu, dateStr);

  expect(sayRes).toEqual([`${dateStr}.json`, `SAY_${dateStr}.json`]);
  expect(sansRes).toEqual([`${dateStr}.json`]);
});

test('should build draw details urls for given game and date', () => {
  const dateStr = '20200311';
  const sayUrls = buildDrawDetailsUrls(GameID.sayisal, dateStr);
  const sansUrls = buildDrawDetailsUrls(GameID.sanstopu, dateStr);

  expect(sayUrls).toHaveLength(2);
  expect(sansUrls).toHaveLength(1);
  sayUrls.forEach((url) => expect(url).toContain(MPI_BASE));
  sansUrls.forEach((url) => expect(url).toContain(MPI_BASE));
});
