import { AxiosHttpClientAdapter } from "@/infra/adapters"
import { ROUTES } from "@/routes/routes"
import { PaymentService } from "@/services/payment-service"
import { usePaymentStore } from "@/store/payment"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PAYMENT_STATUS, PaymentStatus } from "@/utils/enums/payment-status"
import { PAYMENT_TYPES } from "@/utils/enums/payment-types"

const TEN_SECONDS_IN_MILISECONDS = 1000 * 10 //10sec

export const useCheckPaymentStatus = () => {
  const router = useRouter()
  const {
    state: { paymentPixData, paymentCreditCardData },
    action: { updateStatus }
  } = usePaymentStore()

  useEffect(() => {
    if (
      (paymentPixData?.success && paymentPixData.id_order) ||
      (paymentCreditCardData?.success && paymentCreditCardData.id_order)
    ) {
      const interval = setInterval(async () => {
        const httpClient = new AxiosHttpClientAdapter<null, { status: PaymentStatus }>()

        const [responsePix] = await Promise.all([
          paymentPixData?.id_order ? PaymentService.checkPaymentStatus(paymentPixData.id_order, httpClient) : Promise.resolve(null),
        ])

        if (
          (responsePix && responsePix?.status === PAYMENT_STATUS.DONE)
        ) {
          router.replace(ROUTES.SUCCESS_PAYMENT)
        }

        if (responsePix?.status === 'expired') {
          updateStatus(
            PAYMENT_STATUS.EXPIRED,
            PAYMENT_TYPES.PIX
          )

          clearInterval(interval)
          return
        }
      }, TEN_SECONDS_IN_MILISECONDS)

      return () => {
        clearInterval(interval)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentPixData?.id_order])
}