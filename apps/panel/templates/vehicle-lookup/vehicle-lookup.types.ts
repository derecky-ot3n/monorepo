import { RenavamService } from "@/services/renavam-service"
import { regex } from "@/utils"
import { z } from "zod"

export const VehicleLookupFormSchema = z.object({
  renavam: z
    .string({ required_error: 'Campo obrigatório' })
    .length(11, 'O código Renavam deve conter 11 dígitos.')
    .refine(value => value.replace(/\D/g, '')),

  plate: z.string({
    required_error: 'Por favor, informe uma placa válida.'
  }).min(7, 'Informe uma placa válida.'),
  captcha_token: z.string().min(1)
}).superRefine((fields, ctx) => {
  //Validation plate
  if (
    !regex.plate.test(fields.plate.toUpperCase())
  ) {
    ctx.addIssue({
      path: ['plate'],
      code: z.ZodIssueCode.custom,
      message: "A placa informada é inválida."
    })
  }

  //Validation Renavam
  const renavamService = new RenavamService()
  const isValidRenavam = renavamService.isValidRenavam(fields.renavam)
  if (!regex.renavam.test(fields.renavam) || !isValidRenavam) {
    ctx.addIssue({
      path: ['renavam'],
      code: z.ZodIssueCode.custom,
      message: "O código Renavam informado é inválido."
    })
  }
})

export type VehicleLookupFormProps = z.infer<typeof VehicleLookupFormSchema>