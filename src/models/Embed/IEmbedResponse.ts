import IResponse from '../IResponse';

export interface IEmbedResponse extends IResponse {
  status: number;
  contents?: string;
  header?: [string, string];
}
