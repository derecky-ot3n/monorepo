import { create } from 'zustand'

import { QRCodeScanResultDTO } from '@/dtos/qr-code-scan-resiult.dto'

type QrCodeInspectionActions = {
  update: (QrCodeInspection: QRCodeScanResultDTO) => void,
  setIsLoading: (value: boolean) => void,
  setAuthNumber: (value: string) => void,
  setCaptchaToken: (value: string) => void
  reset: () => void
}

type QrCodeInspectionStore = {
  state: {
    authNumber: string | null,
    qrCodeInspection: QRCodeScanResultDTO | null,
    captcha_token: string,
    isLoading: boolean,
  },
  action: QrCodeInspectionActions,
}

export const useQrCodeInspectionStore = create<QrCodeInspectionStore>((set) => ({
  state: {
    qrCodeInspection: null,
    authNumber: null,
    isLoading: false,
    captcha_token: ""
  },
  action: {
    update: (updatedInspection: QRCodeScanResultDTO) => set((state) => {
      return ({ state: { ...state.state, qrCodeInspection: updatedInspection } })
    }),

    setAuthNumber: (numberCode: string) => set(state => {
      return ({ state: { ...state.state, authNumber: numberCode } })
    }),

    setIsLoading: (value) => set((state) => {
      return ({ state: { ...state.state, isLoading: value } })
    }),

    setCaptchaToken: (value) => set(state => {
      return ({ state: { ...state.state, captcha_token: value } })
    }),

    reset: () => set((state) => {
      return ({
        state: {
          authNumber: null,
          qrCodeInspection: null,
          isLoading: false,
          captcha_token: ""
        }
      })
    })
  }
}))