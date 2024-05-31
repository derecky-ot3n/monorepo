'use client'
import { ChangeEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import pt_BR from 'dayjs/locale/pt-br'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { Inputs } from "./payment-form.types"
import { FormDataSchema } from "./payment-form.validation"
import { formatCpfAndCnpj, formatPhoneNumber } from "@/utils/masks"
import { useSimulationStore } from "@/store/simulation"
import { usePaymentStore } from "@/store/payment"
import { AxiosHttpClientAdapter } from "@/infra/adapters"
import { formatPayloadCreditCardPayment } from "./helpers/format-payload-cc-payment"
import type { PixDTO, CreditCardPaymentDTO } from "@/dtos"
import { PAYMENT_TYPES, type PaymentType } from "@/utils/enums/payment-types"
import { usePixTimerCount } from "../../hooks/use-pix-timer-count"
import { PAYMENT_STATUS } from "@/utils/enums/payment-status"
import { ROUTES } from "@/routes/routes"
import {
  PaymentService,
  type GenerateOrderByCreditCardRequest,
  type GenerateOrderByPixRequest
} from "@/services/payment-service"
import { formatCreditCard } from "@/utils/masks/credit-card"

dayjs.extend(utc)
dayjs.locale(pt_BR)
dayjs.extend(customParseFormat)

export const usePaymentForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedId, setSelectedId] = useState<PaymentType>(PAYMENT_TYPES.CREDIT_CARD)
  const [copied, setCopied] = useState(true)

  const { count, formattedCount } = usePixTimerCount()

  const { state: { simulation } } = useSimulationStore()
  const {
    state: { paymentPixData },
    action: { setIsLoading, update, updateStatus }
  } = usePaymentStore()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const isValidStep1 =
    !errors.fullName?.message &&
    !errors.cpfOrCnpj?.message &&
    !errors.phone?.message &&
    !errors.email?.message &&
    watch(["fullName", "cpfOrCnpj", "phone", "email"]).every(field => !!field)

  const isPix = watch('type') === PAYMENT_TYPES.PIX

  const isValidStep2 =
    !errors.cardNumber?.message &&
    !errors.cardName?.message &&
    !errors.cvv?.message &&
    !errors.expire?.message &&
    watch(["cardNumber", "cardName", "cvv", "expire"]).every(field => !!field)

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      if (simulation) {
        const payload = formatPayloadCreditCardPayment(data, simulation?.id_simulation!)

        const httpClient = new AxiosHttpClientAdapter<GenerateOrderByCreditCardRequest, CreditCardPaymentDTO>()
        const response = await PaymentService.generateOrderByCreditCard(payload, httpClient)
        // if (!response.success) {
        //   toast(getErrorMessage(response), {
        //     description: dayjs().format('dddd, DD [de] MMMM [de] YYYY, [às] HH:mm'),
        //     action: {
        //       label: '×',
        //       onClick: () => ('')
        //     },
        //     classNames: {
        //       actionButton: "bg-white text-black text-2xl p-3 rounded-sm flex items-center justify-center font-bold",
        //       toast: "group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-50"
        //     }
        //   })

        //   return
        // }

        router.replace(ROUTES.SUCCESS_PAYMENT)

        update(response, PAYMENT_TYPES.CREDIT_CARD)
        updateStatus(
          PAYMENT_STATUS.PENDING,
          PAYMENT_TYPES.CREDIT_CARD
        )
      }
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

  const generatePixData = async () => {
    try {
      setIsLoading(true)

      const [fullName, phone, type, cpfOrCnpj, email] = watch([
        "fullName", "phone", "type", "cpfOrCnpj", "email"
      ])

      const payload = {
        simulation_id: simulation?.id_simulation!,
        type,
        customer: {
          name: fullName,
          document: cpfOrCnpj,
          phone,
          email
        }
      }
      const httpClient = new AxiosHttpClientAdapter<GenerateOrderByPixRequest, PixDTO>()
      const response = await PaymentService.generateOrderByPix(payload, httpClient)

      if (response.success) {
        update(response, PAYMENT_TYPES.PIX)
        updateStatus(PAYMENT_STATUS.PENDING, PAYMENT_TYPES.PIX)
      }
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
      setIsLoading(false)
    }
  }

  const handlePayByPix = async () => {
    if (!paymentPixData || count === 0) {
      await generatePixData()
    } else {
      try {
        await navigator.clipboard.writeText(paymentPixData?.code!);
        toast.info("Copiado com sucesso.",
          {
            //ATENTION: This is a specific case
            description: dayjs().format('dddd, DD [de] MMMM [de] YYYY, [às] HH:mm')
              .split(',')
              .map((item, index) => index === 0 ? item[0].toUpperCase() + item.slice(1) : item)
              .join(",")
              .split('de')
              .map((item, index) => index === 1 ? item.trim()[0].toUpperCase() + item.trim().slice(1) : item)
              .join(" de "),
            action: {
              label: '×',
              onClick: () => ('')
            },
            classNames: {
              actionButton: "bg-white text-black text-2xl p-3 rounded-sm flex items-center justify-center font-bold",
              toast: "group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-50"
            }
          }
        )
        setCopied(true);
      } catch (error) {
        console.error('Falha ao copiar para a área de transferência:', error);
      }
    }
  }

  const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.value = formatPhoneNumber(value);
    register("phone").onChange(event)
  }

  const handleSelectTab = (id: PaymentType) => {
    setSelectedId(id)
  }

  const handleChangeCreditCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const cleanedNumber = event.target.value.replace(/\D/g, '');
    const formatedNumber = formatCreditCard(cleanedNumber)

    event.target.value = formatedNumber
    register("cardNumber").onChange(event)
  }

  const handleChangeCpfCnpjField = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.value = formatCpfAndCnpj(value);
    register("cpfOrCnpj").onChange(event)
  }

  const handleChangeCVV = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    let cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length > 3) {
      cleanedValue = cleanedValue.slice(0, -1);
    }

    event.target.value = cleanedValue
    register("cvv").onChange(event)
  }

  const handleChangeExpireDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let cleanedValue = value.replace(/\D/g, '');


    if (cleanedValue.length > 4) {
      cleanedValue = cleanedValue.slice(0, -1);
    }

    cleanedValue = cleanedValue.replace(/(\d{2})(\d)/, '$1/$2')

    event.target.value = cleanedValue
    register("expire").onChange(event)
  }

  const next = async () => {
    setCurrentStep(step => step + 1)
  }

  const prev = () => {
    setCurrentStep(step => step - 1)
  }

  useEffect(() => {
    setValue('type', selectedId as PAYMENT_TYPES)
  }, [selectedId, setValue])

  useEffect(() => {
    count !== 0 && setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return {
    handlers: {
      handleChangePhoneNumber,
      handleChangeCpfCnpjField,
      handleChangeCVV,
      handleChangeCreditCardNumber,
      handleChangeExpireDate,
      handleSubmit: handleSubmit(processForm),
      handlePayByPix,
      handleSelectTab,
    },
    states: {
      currentStep,
      isValid,
      isValidStep1,
      isValidStep2,
      isPix,
      copied,
      formattedCount,
      count
    },
    stepper: {
      prev,
      next,
    },
    form: {
      register,
      errors,
    }
  }
}