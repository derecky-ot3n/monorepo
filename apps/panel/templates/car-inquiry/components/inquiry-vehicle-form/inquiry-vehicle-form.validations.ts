import { regex } from '@/utils/all-regex';
import { RenavamService } from '@/services/renavam-service/renavam-service';
import { z } from 'zod'

export const inquiryVahicleFormSchema = z.object({
  plate: z.string({
    required_error: 'por favor informe uma placa válida.'
  }).min(7, 'Informe uma placa válida.'),
  renavam: z.string()
    .length(11, 'O código Renavam deve conter 11 dígitos.')
    .refine(value => value.replace(/\D/g, '')),
  yearOfExercise: z.string()
    .length(4, "Informe um ano válido")
    .transform(value => value.replace(/\D/g, '')),
  captcha_token: z.string().min(1),
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