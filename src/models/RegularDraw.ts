import LuckyProvince from './LuckyProvince';

export enum DrawType {
  SAYISAL_LOTO = 'SAYISAL_LOTO',
  SANS_TOPU = 'SANS_TOPU',
  ON_NUMARA = 'ON_NUMARA',
  SUPER_LOTO = 'SUPER_LOTO',
}

export enum MatchTypeRegular {
  $HIC = '$HIC',
  $1_1_BILEN = '$1_1_BILEN',
  $2_1_BILEN = '$2_1_BILEN',
  $3_1_BILEN = '$3_1_BILEN',
  $4_1_BILEN = '$4_1_BILEN',
  $5_1_BILEN = '$5_1_BILEN',
  $3_BILEN = '$3_BILEN',
  $4_BILEN = '$4_BILEN',
  $5_BILEN = '$5_BILEN',
  $6_BILEN = '$6_BILEN',
  $7_BILEN = '$7_BILEN',
  $8_BILEN = '$8_BILEN',
  $9_BILEN = '$9_BILEN',
  $10_BILEN = '$10_BILEN',
}

export interface LuckyPerson {
  oid: string;
  kisiBasinaDusenIkramiye: number;
  kisiSayisi: number;
  tur: MatchTypeRegular;
}

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
  bilenKisiler: LuckyPerson[];
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
