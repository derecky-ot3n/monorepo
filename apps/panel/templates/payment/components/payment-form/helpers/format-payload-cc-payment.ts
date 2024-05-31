import { GenerateOrderByCreditCardRequest } from "@/services/payment-service"
import { Inputs as FormData } from "../payment-form.types"

export const formatPayloadCreditCardPayment = (data: FormData, simulationId: string): GenerateOrderByCreditCardRequest => {
  const formatedPhoneNumber = data.phone.replace(/\D/g, '')
  const year = `20${data.expire.split("/")[1]}`
  const month = data.expire.split("/")[0]
  const document = data.cpfOrCnpj.replace(/\D/g, '')

  const payload: GenerateOrderByCreditCardRequest = {
    simulation_id: simulationId,
    type: data.type,
    customer: {
      name: data.fullName,
      document,
      phone: formatedPhoneNumber,
      email: data.email,
    },
    card: {
      name: data.cardName,
      number: data.cardNumber.replaceAll(" ", "").trim(),
      cvv: data.cvv,
      exp_year: year,
      exp_month: month,
    }
  }

  return payload
}



