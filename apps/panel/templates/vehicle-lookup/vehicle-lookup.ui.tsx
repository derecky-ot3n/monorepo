'use client'
import { VehicleLookupFormProps, VehicleLookupFormSchema } from "./vehicle-lookup.types"
import { HighlightTitle } from "@/components/highlight-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionDTO } from "@/dtos"
import { AxiosHttpClientAdapter } from "@/infra/adapters"
import { ROUTES } from "@/routes/routes"
import { InspectionService } from "@/services/inspection-service/inspection-service"
import { CarInspectionDataRequest } from "@/services/inspection-service/inspection-service.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { ChangeEvent, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useCloudflareTurnstile, EXECUTION } from "@/lib/use-cloudflare-turnstile"
import { useInspectionStore } from "@/store/inspection"
import { toast } from "sonner"
import { useTracingStore } from "@/store/tracing"
import { QrCodeReader } from "@/components/qr-code-reader"
import { useQrCodeInspectionStore } from "@/store/scan-result"

export const VehicleLookupPage = () => {
  const router = useRouter()
  const {
    action: { update }
  } = useInspectionStore()
  const { action: { setBackRoute } } = useTracingStore()
  const { action: { setCaptchaToken } } = useQrCodeInspectionStore()

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<VehicleLookupFormProps>({
    resolver: zodResolver(VehicleLookupFormSchema),
    mode: "onChange",
    defaultValues: {
      renavam: ""
    }
  })

  const { turnstileToken, prepareTurnstileWidget } = useCloudflareTurnstile(
    'explicit-container',
    EXECUTION.RENDER
  );

  const processForm = async (data: VehicleLookupFormProps) => {
    try {
      const payload: CarInspectionDataRequest = {
        renavam: data.renavam,
        license_plate: data.plate.toUpperCase(),
        captcha_token: "XXX.DUMMYTOKEN.XXX",
        page: 1
      }

      const httpClient = new AxiosHttpClientAdapter<CarInspectionDataRequest, InspectionDTO>()
      const response = await InspectionService.CarInspection(payload, httpClient)

      if (response.statusCode === 204) {
        toast.info('Não há créditos de carbono registrados para este veículo.', {
          action: {
            label: '×',
            onClick: () => ('')
          },
          classNames: {
            actionButton: "bg-white text-black text-2xl p-3 rounded-sm flex items-center justify-center font-bold",
            toast: "group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-50"
          }
        })
        setValue('renavam', "")
        setValue('plate', "")
        return
      }

      setBackRoute(ROUTES.INSPECTION_INQUIRY)
      update(response.body)
      router.push(ROUTES.INSPECTION_DETAILS)
    } catch (error: any) {
      toast.error(error.message, {
        action: {
          label: '×',
          onClick: () => ('')
        },
        classNames: {
          actionButton: "bg-white text-black text-2xl p-3 rounded-sm flex items-center justify-center font-bold",
          toast: "group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-50"
        }
      })
    }
  }

  const handleChangePlate = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    if (inputValue.length > 7) return event.target.value = inputValue.slice(0, -1)

    register('plate').onChange(event)
    setValue('plate', event.target.value)
  }

  const handleRenavamChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 11) return event.target.value = formattedValue.slice(0, -1)

    event.target.value = formattedValue;
    setValue('renavam', formattedValue)
    register('renavam').onChange(event)
  }

  useEffect(() => {
    setValue('captcha_token', turnstileToken)
    trigger('captcha_token')
    setCaptchaToken(turnstileToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnstileToken, setValue, trigger])

  return (
    <div className="mt-8 md:mt-14">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer
        onReady={prepareTurnstileWidget}
      />

      <HighlightTitle
        title="Fiscalização"
        subtitle="Preencha os campos para realizar a consulta."
      />

      <form
        className="w-full border-slate-200 border rounded-lg xs:mt-8 flex flex-col gap-6 p-6 bg-white max-w-[448px]"
        onSubmit={handleSubmit(processForm)}
      >
        <div className="grid md:grid-cols-[1fr_3fr] items-center">
          <Label className="w-full mb-2 md:mt-0 md:min-w-[100px] text-sm font-medium">Placa</Label>
          <Input
            className="w-full md:min-w-[300px] placeholder:text-slate-300"
            placeholder="ABC1234"
            {...register("plate")}
            onChange={e => handleChangePlate(e)}
          />
          <span className="text-red-600 text-xs font-normal md:col-start-2 md:col-span-2 pt-1">{errors.plate?.message}</span>
        </div>

        <div className="grid md:grid-cols-[1fr_3fr] items-center">
          <Label className="w-full mb-2 md:mt-0 md:min-w-[100px] text-sm font-medium">Renavam</Label>
          <Input
            className="w-full md:min-w-[300px] placeholder:text-slate-300"
            placeholder="12345678910"
            {...register("renavam")}
            onChange={e => handleRenavamChange(e)}
          />
          <span className="text-red-600 text-xs font-normal md:col-start-2 md:col-span-2 pt-1">{errors.renavam?.message}</span>
        </div>

        <div className="grid md:grid-cols-[1fr_3fr] items-center h-[63px]  rounded-sm">
          <input type="hidden" {...register("captcha_token")} value={turnstileToken} />

          <div
            className="cf-turnstile md:col-start-2 md:col-span-2"
            id="explicit-container"
            data-theme="light"
            data-language="pt-br"
            data-appearence="execute"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] items-center gap-y-2">
          <Button className="md:col-start-2" disabled={!isValid}>Consultar</Button>

          <p className="md:col-start-2 text-center text-slate-700 text-sm font-medium block md:hidden">Ou</p>

          <QrCodeReader className="md:col-start-2 block md:hidden" />
        </div>
      </form>
    </div>
  )
}