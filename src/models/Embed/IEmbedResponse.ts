import IResponse from '../IResponse';
import { Header } from '../Header';

export interface IEmbedResponse extends IResponse {
  status: number;
  contents?: string;
  header?: Header;
}
