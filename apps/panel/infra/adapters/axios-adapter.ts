import { HttpClient, HttpRequestData } from "@/services/http/http-client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpClientResponse } from "./adapters.types";
import { getErrorMessage } from "@/utils/error-message";

export class AxiosHttpClientAdapter<T, D> implements HttpClient<T, HttpClientResponse<D>> {
  async request(data: HttpRequestData<T>): Promise<HttpClientResponse<D>> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data?.body,
        headers: data.headers,
      })

    } catch (error) {
      const _error = error as AxiosError<{ message: string, code: string, success: boolean }>

      throw new Error(getErrorMessage(_error.response?.data?.code))
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
