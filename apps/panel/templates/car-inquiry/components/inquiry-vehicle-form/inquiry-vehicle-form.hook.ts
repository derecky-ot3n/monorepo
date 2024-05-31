'use client'
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

import type { InquiryFormData } from "./inquiry-vehicle-form.types";
import { inquiryVahicleFormSchema } from "./inquiry-vehicle-form.validations";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { simulateIquiry } from "@/services/simulate";
import { useSimulationStore } from "@/store/simulation";
import { toast } from "sonner";
import { EXECUTION, useCloudflareTurnstile } from "@/lib/use-cloudflare-turnstile";
import { useInspectionStore } from "@/store/inspection";
import { InspectionDTO, SimulationDTO } from "@/dtos";
import { useTracingStore } from "@/store/tracing";


const INITIAL_STATE: InquiryFormData = {
  plate: "",
  renavam: "",
  yearOfExercise: "",
  captcha_token: ""
}

export const useInquiryVehicleForm = () => {
  const router = useRouter()
  const {
    action: { update, setIsLoading }
  } = useSimulationStore()

  const { action: { update: updateInspection } } = useInspectionStore()
  const { action: { setBackRoute } } = useTracingStore()

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    formState: { errors, isValid }
  } = useForm<InquiryFormData>({
    defaultValues: INITIAL_STATE,
    resolver: zodResolver(inquiryVahicleFormSchema),
    mode: "onChange"
  })

  const { turnstileToken, prepareTurnstileWidget } = useCloudflareTurnstile(
    'explicit-container',
    EXECUTION.RENDER
  );

  const handleCheckSubmit = async (data: InquiryFormData) => {
    try {
      setIsLoading(true)
      const response = await simulateIquiry(data)

      //TODO: create a better verification here
      setBackRoute(ROUTES.INQUIRY_CAR)
      if ('total' in response) {
        updateInspection(response as InspectionDTO)
        router.push(ROUTES.INSPECTION_DETAILS)
      } else {
        update(response as SimulationDTO)
        router.push(ROUTES.INQUIRY_CAR_DETAILS)
      }
    } catch (error: any) {
      setIsLoading(false)
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
    register('renavam').onChange(event)
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 11) return event.target.value = formattedValue.slice(0, -1)

    event.target.value = formattedValue;
    setValue('renavam', formattedValue)
  }

  const handleYearOfExerciseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 4) return event.target.value = formattedValue.slice(0, -1)

    event.target.value = formattedValue;
    setValue('yearOfExercise', formattedValue)
  }

  useEffect(() => {
    setValue('yearOfExercise', "2024")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue("captcha_token", turnstileToken)
    trigger("captcha_token")
  }, [turnstileToken, setValue, trigger])

  return {
    handleSubmit: handleSubmit(handleCheckSubmit),
    register,
    errors,
    isValid,
    handleRenavamChange,
    handleYearOfExerciseChange,
    handleChangePlate,
    prepareTurnstileWidget,
    turnstileToken,
  }
}