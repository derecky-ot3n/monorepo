'use client'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreditCard } from "./components/credit-card"
import { useInspectionStore } from "@/store/inspection"
import { redirect, useRouter } from "next/navigation"
import { ROUTES } from "@/routes/routes"
import { useEffect } from "react"
import { useSimulationStore } from "@/store/simulation"
import { useTracingStore } from "@/store/tracing"

export const CreditsViewPage = () => {
  const { state: { inspection }, action: { reset } } = useInspectionStore()
  const { action: { setIsLoading } } = useSimulationStore()
  const { state: { backRoute } } = useTracingStore()
  const router = useRouter()

  const data = inspection?.data || null

  const handleDirectToInspectionForm = async () => {
    await reset()

    return router.replace(backRoute ?? ROUTES.INSPECTION_INQUIRY)
  }

  if (!inspection) {
    redirect(ROUTES.INSPECTION_INQUIRY)
  }

  useEffect(() => {
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="pb-8 md:pb-12">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center mt-16 mb-8">
        <h1 className="text-slate-900 font-bold text-xl sm:text-2xl leading-6 text-center">Meus Créditos de Carbono</h1>

        <Button className="flex gap-2" onClick={handleDirectToInspectionForm}>
          <Plus size={16} strokeWidth={2} />
          Nova consulta
        </Button>
      </div>

      <div className="flex flex-col gap-y-8 w-full lg:w-fit">
        {!!data && data.map((item) => (
          <CreditCard
            data={item}
            key={item.id_credit}
          />
        ))}
      </div>
    </div>
  )
}