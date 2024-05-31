export type QRCodeScanResultDTO = {
  vehicle: {
    renavam: string,
    license_plate: string,
    category: string
  },
  credit: {
    quantity: number,
    year: number,
    amount: number,
    expires_at: string,
    status: string
  },
  customer: {
    name: string,
    document: string
  }
}