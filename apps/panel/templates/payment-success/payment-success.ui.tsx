'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

import { HighlightTitle } from "@/components/highlight-title"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/routes/routes"

export const PaymentSuccess = () => {
  const router = useRouter()

  return (
    <div className="flex flex-1 flex-col w-full h-full justify-start items-center mt-14">
      <Image
        src="/success-payment.svg"
        alt="Payment success"
        width={60}
        height={72}
      />

      <div className="max-w-[516px] mt-8 md:mt-4">
        <HighlightTitle
          title="Pagamento Confirmado"
          subtitle="Tudo certo com o seu pagamento, estamos emitindo seu certificado e será encaminhado para o email informado."
        />
      </div>

      <span
        className="text-slate-700 font-normal text-sm sm:text-base leading-6 text-center mt-4"
      >
        Para consultar o seu certificado válido, clique no botão &quot;Consultar&quot;.
      </span>

      <div className="mt-8 flex flex-col-reverse md:flex-row gap-4 w-full md:justify-center">
        <Button
          variant="outline"
          asChild
        >
          <a href="https://onecarbon.com.br">
            Finalizar
          </a>
        </Button>

        <Button
          onClick={() => router.replace(ROUTES.INQUIRY_CAR)}
        >
          Consultar
        </Button>
      </div>
    </div >
  )
}