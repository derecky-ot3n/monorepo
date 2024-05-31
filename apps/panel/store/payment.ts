import { create } from 'zustand'

import { PixDTO } from '@/dtos/pix-dto'
import { CreditCardPaymentDTO } from '@/dtos/credit-card-dto'
import { PaymentStatus } from '@/utils/enums/payment-status'
import { PAYMENT_TYPES, PaymentType } from '@/utils/enums/payment-types'

type PaymentActions = {
  update: (
    updatedPix: PixDTO | CreditCardPaymentDTO | null,
    type: PaymentType
  ) => void,
  setIsLoading: (value: boolean) => void,
  updateStatus: (updatedStatus: PaymentStatus, type: PaymentType) => void
}

type PaymentStates = {
  paymentPixData: PixDTO | null,
  paymentCreditCardData: CreditCardPaymentDTO | null,
  type: PaymentType | null,
  isLoading: boolean,
  hasGeneratedPayment: boolean,
  paymentStatus: {
    pix: PaymentStatus | null,
    creditCard: PaymentStatus | null,
  }
}

type PaymentStore = {
  state: PaymentStates,
  action: PaymentActions,
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  state: {
    paymentPixData: null,
    paymentCreditCardData: null,
    type: null,
    isLoading: false,
    hasGeneratedPayment: false,
    paymentStatus: {
      creditCard: null,
      pix: null
    }
  },
  action: {
    update: (updatedPayment, type) => set((state) => {
      let updatedInfo: PaymentStates;
      if (type === PAYMENT_TYPES.PIX) {
        updatedInfo = {
          ...state.state,
          paymentPixData: updatedPayment as PixDTO,
          hasGeneratedPayment: true,
        }
      } else {
        updatedInfo = {
          ...state.state,
          paymentCreditCardData: updatedPayment as CreditCardPaymentDTO,
          type,
        }
      }

      return ({
        state: updatedInfo,
        action: state.action
      })
    }),

    setIsLoading: (value) => set((store) => {
      return ({ state: { ...store.state, isLoading: value } })
    }),

    updateStatus: (updatedStatus, type) => set((state) => {
      let updatedStore: PaymentStates

      if (type === PAYMENT_TYPES.PIX) {
        updatedStore = {
          ...state.state,
          paymentStatus: {
            creditCard: state.state.paymentStatus?.creditCard,
            pix: updatedStatus
          }
        }
      } else {
        updatedStore = {
          ...state.state,
          paymentStatus: {
            creditCard: updatedStatus,
            pix: state.state.paymentStatus?.pix
          }
        }
      }

      return {
        state: updatedStore,
        action: state.action
      }
    })
  }
}))