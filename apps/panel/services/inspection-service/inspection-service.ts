import { CarInspectionDataRequest } from "./inspection-service.types"
import { HttpClient } from "@/services/http/http-client"
import { HttpClientResponse } from "@/infra/adapters/adapters.types";
import { InspectionDTO } from "@/dtos/inspection-dto";

type T = CarInspectionDataRequest

type Response = {
  body: InspectionDTO,
  statusCode: number
}

export class InspectionService {
  static async CarInspection(
    data: T,
    httpClient: HttpClient<T, HttpClientResponse<InspectionDTO>>
  ): Promise<Response> {
    try {
      const response = await httpClient.request({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/inspection`,
        method: "POST",
        body: {
          renavam: data.renavam,
          license_plate: data.license_plate,
          captcha_token: data.captcha_token,
          page: data.page,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}