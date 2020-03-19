import Draw from '../Draw';
import LuckyProvince from '../LuckyProvince';
import { WinnerCategory } from './WinnerCategory';
import { DrawType } from './DrawType';

/**
 * RegularDraw interface.
 */
export default interface RegularDraw extends Draw {
  archived?: boolean;
  oid: string;
  hafta: number;
  buyukIkramiyeKazananIl?: string;
  cekilisTuru: DrawType;
  rakamlar: string;
  rakamlarNumaraSirasi: string;
  devretti: boolean;
  devirSayisi?: number;
  bilenKisiler: WinnerCategory[];
  buyukIkrKazananIlIlceler?: LuckyProvince[];
  kibrisHasilati?: number;
  devirTutari: number;
  kolonSayisi?: number;
  kdv?: number;
  toplamHasilat?: number;
  hasilat?: number;
  sov?: number;
  ikramiyeEH?: number;
  buyukIkramiye: number;
  haftayaDevredenTutar?: number;
}
