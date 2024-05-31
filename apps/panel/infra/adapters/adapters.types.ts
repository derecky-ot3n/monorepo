export interface HttpClientResponse<D> {
  statusCode: number;
  body: D;
}