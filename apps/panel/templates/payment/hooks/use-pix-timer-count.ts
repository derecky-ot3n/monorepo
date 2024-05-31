'use client'

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

import { usePaymentStore } from "@/store/payment";
import { useEffect, useState } from "react";
import { PAYMENT_STATUS } from "@/utils/enums/payment-status";

dayjs.extend(utc)

export const usePixTimerCount = () => {
  const [count, setCount] = useState(0)
  const formattedCount = dayjs(count).format('mm:ss')

  const {
    state: { paymentPixData, paymentStatus }
  } = usePaymentStore()

  useEffect(() => {
    if (paymentPixData && paymentPixData.valid_until) {
      const finalTime = dayjs.utc(paymentPixData.valid_until)

      const interval = setInterval(async () => {
        const now = dayjs.utc()
        const diffInSeconds = finalTime.diff(now)

        if (
          diffInSeconds <= 0 ||
          paymentStatus.pix === PAYMENT_STATUS.EXPIRED
        ) {
          clearInterval(interval)

          setCount(0)
        } else {
          setCount(diffInSeconds)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentPixData?.valid_until, paymentStatus.pix]);

  return {
    count,
    formattedCount
  }
}