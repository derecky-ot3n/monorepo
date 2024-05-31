import { CreditCardPaymentDTO, PixDTO } from "@/dtos"
import { GenerateOrderByCreditCardRequest, GenerateOrderByPixRequest } from "./payment-service.types"
import { HttpClient } from "@/services/http/http-client"
import { HttpClientResponse } from "@/infra/adapters/adapters.types";
import { PAYMENT_TYPES, PaymentType } from "@/utils/enums/payment-types";
import { PaymentStatus } from "@/utils/enums/payment-status";

export class PaymentService {
  static async generateOrderByCreditCard(
    data: GenerateOrderByCreditCardRequest,
    httpClient: HttpClient<GenerateOrderByCreditCardRequest, HttpClientResponse<CreditCardPaymentDTO>>
  ): Promise<CreditCardPaymentDTO> {
    try {
      const response = await httpClient.request({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/payment`,
        method: "POST",
        body: {
          ...data,
          type: PAYMENT_TYPES.CREDIT_CARD
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.body;
    } catch (error) {
      throw error;
    }
  }

  static async generateOrderByPix(
    data: GenerateOrderByPixRequest,
    httpClient: HttpClient<GenerateOrderByPixRequest, HttpClientResponse<PixDTO>>
  ) {
    try {
      const response = await httpClient.request({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/payment`,
        method: "POST",
        body: {
          ...data,
          type: PAYMENT_TYPES.PIX
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return response.body
    } catch (error) {
      throw error
    }
  }

  static async checkPaymentStatus(
    orderId: string,
    httpClient: HttpClient<null, HttpClientResponse<{ status: PaymentStatus }>>,
  ) {
    try {
      const response = await httpClient.request({
        url: `${process.env.NEXT_PUBLIC_BASE_URL_API}/payment/${orderId}/status`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return response.body
    } catch (error) {
      throw error
    }
  }

}