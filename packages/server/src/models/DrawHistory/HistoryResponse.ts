import Response from '../Response';
import { DrawHistoryData } from '.';

export interface HistoryResponse extends Response {
  history: DrawHistoryData[];
}
