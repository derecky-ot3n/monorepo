export interface HttpRequestData<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';
  body?: T;
  headers?: any;
}

export interface HttpClient<T, D> {
  request: (data: HttpRequestData<T>) => Promise<D>
}