import { IDrawData } from '../Draw';
import { RegularDrawType, WinnerCategory } from '.';
import LuckyProvince from '../LuckyProvince';

export interface IRegularDrawData extends IDrawData {
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
