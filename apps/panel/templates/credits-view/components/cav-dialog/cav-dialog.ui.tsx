'use client'
import { Button } from "@/components/ui/button"
import * as Dialog from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditsDTO } from "@/dtos"
import { cn } from "@/lib/utils"
import { useInspectionStore } from "@/store/inspection"
import { STATUS } from "@/utils/enums/payment-status"
import { Download, Eye } from "lucide-react"

type CAVDialogProps = {
  url: string,
  data: CreditsDTO
}

export const CAVDialog = ({ url, data }: CAVDialogProps) => {
  const { state: { inspection } } = useInspectionStore()

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger
        className={cn(
          "flex md:flex-1 gap-2 items-center justify-start bg-slate-100 md:bg-white hover:bg-slate-100/80 px-4 py-2",
          "text-slate-800 font-normal text-sm",
          "border-slate-200",
          "disabled:cursor-not-allowed",
          "rounded-none border-none"
        )}
        disabled={data.status !== STATUS.ISSUED}
      >
        <Eye size={16} strokeWidth={1.33} className="w-4 h-4 min-w-4 min-h-4" />
        <span className="hidden md:flex">Visualizar certificado</span>
        <span className="md:hidden flex whitespace-nowrap">Visualizar CAV</span>
      </Dialog.DialogTrigger>

      <Dialog.DialogContent className="p-0  md:min-w-[640px]">
        <Dialog.DialogHeader className=" border-b border-slate-300 h-[67px] p-6 text-gray-900 font-semibold text-lg flex cursor-pointer">
          Visualizar certificado
        </Dialog.DialogHeader>

        <ScrollArea className="md:px-5 py-1 max-h-[500px]">
          <iframe
            src={url}
            className="w-full h-[400px]"
          />
        </ScrollArea>

        <Dialog.DialogFooter className="border-t border-slate-300 p-6 flex flex-col-reverse md:flex-row gap-4">
          <Dialog.DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </Dialog.DialogClose>

          <Button
            className="disabled:cursor-not-allowed"
            disabled={data.status !== STATUS.ISSUED}
            asChild
          >
            <a
              className="flex gap-2"
              href={url}
              target="_blank"
              download
            >
              <Download size={16} strokeWidth={2} />
              Baixar certificado
            </a>
          </Button>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}