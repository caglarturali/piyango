import { MatchText } from '../Match';

export enum RegularMatch {
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

export const RegularMatchMap: {
  [key: string]: MatchText;
} = {
  $HIC: { long: 'Hiç Bilmeyen', short: '0' },
  $1_1_BILEN: { long: '1+1 Bilen', short: '1+1' },
  $2_1_BILEN: { long: '2+1 Bilen', short: '2+1' },
  $3_1_BILEN: { long: '3+1 Bilen', short: '3+1' },
  $4_1_BILEN: { long: '4+1 Bilen', short: '4+1' },
  $5_1_BILEN: { long: '5+1 Bilen', short: '5+1' },
  $3_BILEN: { long: '3 Bilen', short: '3' },
  $4_BILEN: { long: '4 Bilen', short: '4' },
  $5_BILEN: { long: '5 Bilen', short: '5' },
  $6_BILEN: { long: '6 Bilen', short: '6' },
  $7_BILEN: { long: '7 Bilen', short: '7' },
  $8_BILEN: { long: '8 Bilen', short: '8' },
  $9_BILEN: { long: '9 Bilen', short: '9' },
  $10_BILEN: { long: '10 Bilen', short: '10' },
};
