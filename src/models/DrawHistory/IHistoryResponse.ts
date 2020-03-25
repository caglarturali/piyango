import IResponse from '../IResponse';
import { IDrawHistory } from '.';

export interface IHistoryResponse extends IResponse {
  history: IDrawHistory[];
}
