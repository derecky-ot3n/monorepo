import { SimulationDTO } from "@/dtos/simulation"
import { InquiryFormData } from "@/templates/car-inquiry/components/inquiry-vehicle-form"
import { BaseApi } from "./server"
import { InspectionDTO } from "@/dtos"
import { AxiosError } from "axios"
import { getErrorMessage } from "@/utils/error-message"

export const simulateIquiry = async (data: InquiryFormData): Promise<SimulationDTO | InspectionDTO> => {
  try {
    const payload = {
      license_plate: data.plate.toUpperCase(),
      renavam: data.renavam,
      year: Number(data.yearOfExercise),
      captcha_token: data.captcha_token
    }

    const response = await BaseApi.post('/simulation', {
      ...payload
    })

    return response.data

  } catch (error) {
    const _error = error as AxiosError<{ message: string, code: string, success: boolean }>

    throw new Error(getErrorMessage(_error.response?.data?.code))
  }
}