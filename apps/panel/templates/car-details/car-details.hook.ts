'use client'

import { ROUTES } from "@/routes/routes"
import { useSimulationStore } from "@/store/simulation"
import { useRouter, redirect } from "next/navigation"
import { useEffect } from "react"

export const useInquiryVehicleDetails = () => {
  const router = useRouter()
  const {
    state: { simulation },
    action: { setIsLoading }
  } = useSimulationStore()

  if (!simulation) {
    redirect(ROUTES.INQUIRY_CAR)
  }

  const handleGoBackToNewInquiry = () => {
    router.push(ROUTES.INQUIRY_CAR)
  }

  const handleGoToPayment = () => {
    router.push(ROUTES.PAYMENT)
  }

  useEffect(() => {
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { handleGoBackToNewInquiry, handleGoToPayment, simulation }
}