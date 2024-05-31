import { z } from "zod";

import { regex, isValidCNPJ, isValidCPF, isValidCreditCard } from "@/utils";
import { isValidExpireDate } from "@/utils/validate-expire-date";

const fullName = z.string()
  .min(3, { message: "Informe seu nome completo." })
  .refine(
    val => regex.fullName.test(val),
    { message: "Informe seu nome completo" }
  )

const cpfOrCnpj = z.string()
  .min(11, { message: "Informe seu CPF/CNPJ." })
  .refine(
    val => regex.cpf.test(val) || regex.cnpj.test(val),
    { message: "Informe um CPF/CNPJ válido." }
  )
  .refine(
    val => isValidCPF(val) || isValidCNPJ(val),
    { message: "Informe um CPF/CNPJ válido." }
  )

const phone = z.string()
  .min(1, { message: "Informe seu número de telefone." })
  .refine(val => regex.phoneNumber.test(val), { message: "Informe um número de telefone válido." })

const email = z.string()
  .min(1, { message: "Informe seu email." })
  .refine(val => regex.email.test(val), { message: "Informe um email válido." })

const cardNumber = z.string()
  .min(1, { message: 'Informe o número do cartão de crédito' })
  .refine(val => isValidCreditCard(val), { message: 'Informe um Número de cartão de crédito válido' })

const cardName = z.string().min(3, { message: "Informe o nome do titular do cartão." })

const expire = z.string()
  .min(4, 'Informe uma data de expiração válida.')
  .refine(value => isValidExpireDate(value), { message: 'Cartão já expirado.' })

export const FormDataSchema = z.object({
  fullName,
  cpfOrCnpj,
  phone,
  email,
  type: z.string(),
  cardNumber,
  cardName,
  cvv: z.string().length(3, 'Informe um código válido.'),
  expire,
})
