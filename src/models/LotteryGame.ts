import LuckyProvince from './LuckyProvince';

export enum MatchTypeLottery {
  $7_RAKAM = '$7_RAKAM',
  $6_RAKAM = '$6_RAKAM',
  SON_ALTI_RAKAM = 'SON_ALTI_RAKAM',
  SON_BES_RAKAM = 'SON_BES_RAKAM',
  SON_DORT_RAKAM = 'SON_DORT_RAKAM',
  SON_UC_RAKAM = 'SON_UC_RAKAM',
  SON_IKI_RAKAM = 'SON_IKI_RAKAM',
  AMORTI = 'AMORTI',
  TESELLI = 'TESELLI',
}

export interface LotteryResult {
  haneSayisi: number;
  tip: MatchTypeLottery;
  ikramiye: number;
  numaralar: string[];
}

export default interface LotteryGame {
  cekilisAdi: string;
  cekilisTarihi: string;
  cekilisTarihiOld: string | null;
  haneSayisi: number;
  sonuclar: LotteryResult[];
  buyukIkrKazananIlIlceler: LuckyProvince[];
}
