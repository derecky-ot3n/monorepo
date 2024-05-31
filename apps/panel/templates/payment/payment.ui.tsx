'use client'

import { HighlightTitle } from "@/components/highlight-title"
import { Label } from "@/components/ui/label"
import { PaymentForm } from "@/templates/payment/components/payment-form"
import { usePaymentPage } from "./payment.hook"
import { useCheckPaymentStatus } from "./hooks/use-check-payment-status"

export const PaymentPage = () => {
  const { simulation } = usePaymentPage()
  useCheckPaymentStatus()

  const VEHICLE_DETAILS = [
    { label: 'Placa', value: simulation?.vehicle.license_plate },
    { label: 'Renavam', value: simulation?.vehicle.renavam },
    { label: 'Categoria', value: simulation?.vehicle.category },
    { label: 'Exercício', value: simulation?.year },
    { label: 'Estado', value: simulation?.vehicle.state },
  ]

  return (
    <div className="mt-8 md:mt-14">
      <HighlightTitle
        title="Pagamento"
        subtitle="Confirme sua compra com cartão de crédito ou Pix."
      />

      <div className="grid md:grid-cols-[2fr_1.5fr] border-slate-200 border rounded-lg xs:mt-8 gap-10 p-6 bg-white mb-8 max-w-[1024px]">
        <PaymentForm />

        <div className="pb-4 border border-slate-200 self-start">
          <div className="flex w-full bg-slate-700 items-center justify-center">
            <h3 className="bg-slate-700 font-bold text-lg text-white text-center px-6 py-2 ">
              Detalhes da sua compra
            </h3>
          </div>

          <div className="px-6">
            <p className="font-normal text-sm my-4">Dados do veículo:</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
              {VEHICLE_DETAILS.map((item) => (
                <div key={item.label} className="relative w-full">
                  <Label className="font-bold text-sm text-gray-900 mr-1">{item.label}:</Label>
                  <span className="w-full font-medium text-sm text-gray-900 text-ellipsis">{item.value}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-5">
              <span className="font-normal text-base text-slate-600 flex gap-1 justify-between items-center whitespace-nowrap">
                Créditos necessários:
                <strong className="font-bold text-slate-900 w-full text-end">{simulation?.total_credit_units}</strong>
              </span>
              <span className="font-normal text-base text-slate-600 flex gap-1 justify-between items-center whitespace-nowrap">
                Valor total:
                <strong className="font-bold text-slate-900 w-full text-end">
                  {simulation?.total_cost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}