import { ROUTES } from "@/routes/routes"
import { usePaymentStore } from "@/store/payment"
import { useSimulationStore } from "@/store/simulation"
import { redirect } from "next/navigation"

export const usePaymentPage = () => {
  const { state: { simulation } } = useSimulationStore()
  const {
    state: { isLoading, paymentPixData },
  } = usePaymentStore()

  if (!simulation) {
    redirect(ROUTES.INQUIRY_CAR)
  }

  return {
    simulation,
    isLoading,
    paymentPixData,
  }
}