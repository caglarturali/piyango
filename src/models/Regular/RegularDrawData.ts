import { DrawData, LuckyProvince } from '../Draw';
import { RegularDrawType, WinnerCategory } from './';

export interface RegularDrawData extends DrawData {
  archived?: boolean;
  oid: string;
  hafta: number;
  buyukIkramiyeKazananIl?: string;
  cekilisTuru: RegularDrawType;
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
