import { LuckyProvince } from './LuckyProvince';

/**
 * Base interface definiton for draw data.
 */
export interface DrawData {
  cekilisTarihi: string;
  buyukIkrKazananIlIlceler?: LuckyProvince[];
}
