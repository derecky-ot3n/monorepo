import { User, UserCheck } from "lucide-react"
import { StepperProps } from "./stepper.types"
import { cn } from "@/lib/utils"

export const Stepper = ({ currentStep }: StepperProps) => {
  const firstStepClassName = currentStep === 0 ? 'text-slate-900 font-bold' : 'text-primary font-medium'
  const secondStepClassName = currentStep === 1 ? 'font-bold text-slate-bold' : 'text-gray-500  font-medium'

  return (
    <div className="flex sm:min-w-[440px] gap-1 xs:gap-2 sm:gap-4 sm:justify-between items-center mb-4">
      <div
        className={cn("flex sm:w-fit text-sm leading-tight items-center gap-[6px] ", firstStepClassName)}
      >
        {currentStep === 0 ? <User strokeWidth={2} size={20} /> : <UserCheck strokeWidth={2} size={20} />}
        <span className="sm:min-w-[88px]">Identificação</span>
      </div>

      <>
        <hr className="sm:w-full " />
        <span className="sm:hidden text-gray-200">/</span>
      </>

      <div
        className={cn("flex sm:w-fit whitespace-nowrap text-sm leading-tight", secondStepClassName)}
      >
        <span>Métodos de pagamento</span>
      </div>
    </div>
  )
}