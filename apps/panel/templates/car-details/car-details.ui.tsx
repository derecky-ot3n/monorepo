'use client'

import { HighlightTitle } from "@/components/highlight-title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useInquiryVehicleDetails } from "./car-details.hook";



export const InquiryVehicleDetails = () => {
  const {
    handleGoBackToNewInquiry,
    handleGoToPayment,
    simulation,
  } = useInquiryVehicleDetails()

  const VEHICLE_DETAILS = [
    { label: 'Placa', value: simulation.vehicle.license_plate },
    { label: 'Renavam', value: simulation.vehicle.renavam },
    { label: 'Categoria', value: simulation.vehicle.category },
    { label: 'Exercício', value: simulation.year },
    { label: 'Estado', value: simulation.vehicle.state },
  ]

  return (
    <div className="mt-8 md:mt-14">
      <HighlightTitle
        title="Dados da Consulta"
        subtitle="Confirme seus dados e prossiga para o pagamento."
      />

      <div className="border-slate-200 border rounded-lg xs:mt-8 flex flex-col gap-6 p-6 max-w-[448px] bg-white" >
        <header className="flex flex-wrap gap-4" >
          {
            VEHICLE_DETAILS.map((item) => (
              <div className="flex gap-1 items-center flex-wrap" key={item.label} >
                <Label className="font-bold text-sm text-gray-900" > {item.label}: </Label>
                < span className="font-medium text-sm text-gray-900 capitalize" > {item.value} </span>
              </div>
            ))
          }
        </header>

        < hr />

        <main className="flex flex-col gap-5" >
          <span className="font-normal text-base text-slate-600 flex justify-between items-center" > Créditos necessários:
            <strong className="font-bold text-2xl text-slate-900" >{simulation.total_credit_units}</strong>
          </span>
          < span className="font-normal text-base text-slate-600 flex justify-between items-center" > Valor total:
            <strong className="font-bold text-2xl text-slate-900" >
              {simulation.total_cost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </strong>
          </span>
        </main>

        < hr />

        <footer className="flex flex-col-reverse w-full sm:flex-row gap-4" >
          <Button
            onClick={handleGoBackToNewInquiry}
            variant={"outline"}
          >
            Nova Consulta
          </Button>

          < Button
            className="flex flex-1"
            onClick={handleGoToPayment}
          >
            Ir para pagamento
          </Button>
        </footer>
      </div>


    </div>
  )
}