import { MatchText } from '../Match';

export enum LotteryMatch {
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

export const LotteryMatchMap: { [key: string]: MatchText } = {
  $7_RAKAM: { long: '7 Rakam' },
  $6_RAKAM: { long: '6 Rakam' },
  SON_ALTI_RAKAM: { long: 'Son 6 Rakam' },
  SON_BES_RAKAM: { long: 'Son 5 Rakam' },
  SON_DORT_RAKAM: { long: 'Son 4 Rakam' },
  SON_UC_RAKAM: { long: 'Son 3 Rakam' },
  SON_IKI_RAKAM: { long: 'Son 2 Rakam' },
  AMORTI: { long: 'Amorti' },
  TESELLI: { long: 'Teselli' },
};
