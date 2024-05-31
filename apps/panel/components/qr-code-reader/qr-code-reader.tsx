'use client'

import * as Dialog from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import QrReader from 'react-qr-scanner'
import Image from 'next/image'
import { BaseApi } from '@/services/server'
import { useRouter } from 'next/navigation'
import { useQrCodeInspectionStore } from '@/store/scan-result'
import { ROUTES } from '@/routes/routes'

export type QrCodeReaderProps = React.HTMLAttributes<HTMLButtonElement> & {}

const previewStyle = {
  height: 240,
  width: 320,
}

const MESSAGE_SCAN_NOTFOUND = "Nenhum QR Code válido foi detectado."

const QrCodeReader = ({ ...rest }: QrCodeReaderProps) => {
  const router = useRouter()
  const { action: { update, setIsLoading, setAuthNumber }, state: { captcha_token } } = useQrCodeInspectionStore()
  const [showError, setShowError] = useState(false)
  const disableScanCTA = captcha_token === ""

  const handleError = (err: any) => {
    console.error(err)
  }

  const handleScan = async (result: any) => {
    if (result) {
      setIsLoading(true)
      try {
        const response = await BaseApi.post("/inspection/qrcode", {
          qrcode: result.text,
          captcha_token,
        })

        if (response) {
          console.log(response)
          update(response.data)
          setAuthNumber(result.text)
        }

        return router.push(ROUTES.SCAN_RESULT)

      } catch (error) {
        console.log(error);

      }
    } else {
      setShowError(true)
    }
  }

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          disabled={disableScanCTA}
          {...rest}
        >
          Ler Qr Code
        </Button>
      </Dialog.DialogTrigger>

      <Dialog.DialogContent className='m-0 px-0'>
        <Dialog.DialogTitle className='px-4'>Ler Qr Code</Dialog.DialogTitle>

        <div className='border-t border-b border-slate-200 p-5 flex flex-col gap-6 '>
          <div className='flex flex-col gap-2'>
            <h3 className='text-base font-bold text-slate-800'>Fiscalização por leitura de QR Code</h3>
            <p className='text-base font-normal text-slate-500'>Por favor, posicione a câmera de forma alinhada ao QR Code para garantir uma leitura precisa.</p>
          </div>

          <div className='relative flex items-center justify-center w-full h-[300px]'>
            <QrReader
              delay={500}
              onError={handleError}
              onScan={handleScan}
              style={previewStyle}
              className='w-full h-full bg-black justify-self-center '
            />

            <div className='absolute w-full h-full flex justify-center items-center'>
              <Image
                src={"/svgs/qrcode-border.svg"}
                width={176}
                height={176}
                alt='qrcode corners'
              />
            </div>
          </div>

          <span
            data-active={showError}
            className='h-[24px] text-base data-[active=false]:hidden text-red-600 text-center data-[active=true]:block'
          >
            {MESSAGE_SCAN_NOTFOUND}
          </span>
        </div>

        <Dialog.DialogFooter className='px-4 items-end'>
          <Dialog.DialogClose>
            <Button variant="outline">Cancelar</Button>
          </Dialog.DialogClose>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}

QrCodeReader.defaultProps = {

}

export { QrCodeReader }