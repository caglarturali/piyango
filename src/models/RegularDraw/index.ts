import LuckyProvince from '../LuckyProvince';
import { WinnerCategory } from './WinnerCategory';
import { DrawType } from './DrawType';

export * from './DrawType';
export * from './GameColumn';
export * from './MatchTypeRegular';
export * from './RegularCheckResult';
export * from './WinnerCategory';

/**
 * RegularDraw interface.
 */
export default interface RegularDraw {
  archived?: boolean;
  oid: string;
  hafta: number;
  buyukIkramiyeKazananIl?: string;
  cekilisTarihi: string;
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
