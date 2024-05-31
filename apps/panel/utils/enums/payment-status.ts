export type PaymentStatus = 'pending' | 'expired' | 'denied' | 'done'

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  EXPIRED = 'expired',
  DENIED = 'denied',
  DONE = 'done',
}

export type StatusMapperKeys = "waiting_for_emission" | "issued" | "pending"

export enum STATUS {
  WAITING_FOR_EMISSION = 'waiting_for_emission',
  ISSUED = 'issued',
  PENDING = 'pending'
}

export const paymentStatusMapper = {
  "waiting_for_emission": { value: 'Processando', color: "bg-yellow-100 text-yellow-800" },
  "pending": { value: 'Pendente', color: "bg-status-pending text-status-pending-foreground" },
  "issued": { value: 'Emitido', color: "bg-status-sent text-status-sent-foreground" },
}