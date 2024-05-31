import { cn } from "@/lib/utils"
import { STATUS, paymentStatusMapper } from "@/utils/enums/payment-status"

type StatusPillProps = {
  status: string,
}

export const StatusPill = ({ status }: StatusPillProps) => {

  const statusFiltered = paymentStatusMapper[status as keyof typeof paymentStatusMapper]

  return (
    <span
      className={cn(
        "w-full text-center text-sm rounded-md",
        `py-0.5 px-2.5  w-fit font-medium`,
        status === STATUS.ISSUED && 'bg-status-sent text-status-sent-foreground',
        status === STATUS.PENDING && 'bg-yellow-100 text-yellow-800',
        status === STATUS.WAITING_FOR_EMISSION && 'bg-status-pending text-status-pending-foreground',
      )}
    >
      {statusFiltered.value}
    </span>
  )
}