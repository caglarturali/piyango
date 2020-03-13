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

export default interface RegularGame {
  success: boolean;
  data: {
    archived: boolean | null;
    oid: string;
    hafta: number;
    buyukIkramiyeKazananIl: string | null;
    cekilisTarihi: string;
    cekilisTuru: DrawType;
    rakamlar: string;
    rakamlarNumaraSirasi: string;
    devretti: boolean;
    devirSayisi: number | null;
    bilenKisiler: LuckyPerson[];
    buyukIkrKazananIlIlceler: LuckyProvince[] | null;
    kibrisHasilati: number | null;
    devirTutari: number;
    kolonSayisi: number | null;
    kdv: number | null;
    toplamHasilat: number | null;
    hasilat: number | null;
    sov: number | null;
    ikramiyeEH: number | null;
    buyukIkramiye: number;
    haftayaDevredenTutar: number | null;
  };
}
