import IResponse from './IResponse';

export default interface EmbedResponse extends IResponse {
  status: number;
  contents?: string;
}
