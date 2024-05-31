import { HttpClient, HttpRequestData } from "@/services/http/http-client";

interface HttpClientResponse {
  statusCode: number;
  body: any;
}

export class FetchHttpClientAdapter<T extends BodyInit> implements HttpClient<T, HttpClientResponse> {
  async request(data: HttpRequestData<T>): Promise<HttpClientResponse> {
    let fetchResponse: Response;

    try {
      fetchResponse = await fetch(data.url, {
        method: data.method,
        body: data.body,
        headers: data.headers,
      });

      const responseBody = await fetchResponse.json();

      return {
        statusCode: fetchResponse.status,
        body: responseBody
      };
    } catch (error) {
      const _error = error as Error
      throw new Error(_error.message);
    }
  }
}
