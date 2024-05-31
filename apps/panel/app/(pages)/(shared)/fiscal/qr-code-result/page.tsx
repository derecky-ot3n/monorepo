'use client'

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/routes/routes"
import { useQrCodeInspectionStore } from "@/store/scan-result"
import { StatusPill } from "@/templates/credits-view/components/status-pill/status-pill.ui"
import dayjs from "dayjs"
import { Download, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter, redirect } from "next/navigation"

export default function QRCodeResultPage() {
  const router = useRouter()
  const {
    state: { qrCodeInspection, authNumber },
    action: { reset }
  } = useQrCodeInspectionStore()

  const price = qrCodeInspection?.credit.amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  const date = dayjs(qrCodeInspection?.credit.expires_at).format('DD/MM/YYYY')

  const handleBack = () => {
    reset()
    router.replace(ROUTES.INSPECTION_INQUIRY)
  }

  if (!qrCodeInspection) {
    redirect(ROUTES.INSPECTION_INQUIRY)
  }

  return (
    <main className="pt-8 w-full flex flex-col items-center">
      <div className="w-[342px]">
        <h1 className="text-center text-lg text-slate-900 font-bold">Compensação Ambiental Veicular (CAV)&nbsp;Autenticada pela Global Carbon</h1>
        <h2 className="text-center font-normal text-base text-slate-500 pt-2">Verifique se as informações exibidas correspondem aos dados do documento apresentado.</h2>
      </div>

      <div className="w-full divide-y p-6 space-y-4 bg-white border border-slate-200 rounded-lg mt-4 max-w-[469px]">
        <div>
          <span className="block text-base font-medium text-slate-600 mb-2">
            Dados do proprietário
          </span>

          <div className="grid grid-cols-2 divide-x ">
            <div>
              <label className="font-bold text-sm text-slate-900">Nome</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.customer.name}</span>
            </div>

            <div className="pl-4">
              <label className="font-bold text-sm text-slate-900">CPF/CNPJ</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.customer.document}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <span className="block text-base font-medium text-slate-600 mb-2">
            Dados do veículo:
          </span>

          <div className="grid grid-cols-2 divide-x">
            <div>
              <label className="font-bold text-sm text-slate-900">Renavam</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.vehicle.renavam}</span>
            </div>

            <div className="pl-4">
              <label className="font-bold text-sm text-slate-900">Placa</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.vehicle.license_plate}</span>
            </div>
          </div>

          <div className="grid grid-cols-2  divide-x">
            <div>
              <label className="font-bold text-sm text-slate-900">Categoria</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.vehicle.category}</span>
            </div>

            <div className="pl-4">
              <label className="font-bold text-sm text-slate-900">Exercício</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.credit.year}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <span className="block text-base font-medium text-slate-600 mb-2">
            Créditos de carbono:
          </span>

          <div className="grid grid-cols-2 divide-x">
            <div className="font-bold text-sm text-slate-900">
              <label>Créditos</label>
              <span className="block font-medium text-sm text-slate-900">{qrCodeInspection?.credit.quantity}</span>
            </div>

            <div className="pl-4">
              <label className="font-bold text-sm text-slate-900">Valor</label>
              <span className="block font-medium text-sm text-slate-900">{price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x">
            <div>
              <label className="font-bold text-sm text-slate-900">Vencimento</label>
              <span className="block font-medium text-sm text-slate-900">{date}</span>
            </div>

            <div className="pl-4">
              <label className="block font-bold text-sm text-slate-900">Status</label>
              <StatusPill status={qrCodeInspection?.credit.status!} />
            </div>
          </div>

          <div className="p-2 border border-dashed border-slate-200 rounded-md">
            <label className="block text-base font-medium text-slate-600 mb-2">Número de autenticação:</label>
            <span className="text-slate-900 text-sm font-normal">{authNumber}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8 py-8 w-full md:justify-center">
        <Button
          variant="outline"
          className="flex gap-2"
          asChild
        >
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/credit/${authNumber}/download`}
            target="_blank"
          >
            <Download size={16} />
            Baixar certificado
          </Link>
        </Button>

        <Button
          variant="default"
          className="flex gap-2"
          onClick={handleBack}
        >
          <Plus size={16} />
          Nova consulta
        </Button>
      </div>
    </main >
  )
}