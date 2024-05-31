'use client'
import { CreditsDTO } from "@/dtos";
import { cn } from "@/lib/utils";
import { Download, MoreHorizontal } from "lucide-react";
import { StatusPill } from "../status-pill/status-pill.ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CAVDialog } from "../cav-dialog/cav-dialog.ui";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import { STATUS } from "@/utils/enums/payment-status";
import { Button } from "@/components/ui/button";
dayjs.extend(utc)

type CreditCardProps = {
  data: CreditsDTO;
};

const creditsMapper = {
  id_credit: null,
  renavam: 'Renavam',
  category: 'Categoria',
  credits: 'Créditos',
  year: 'Exercício',
  expires_at: 'Vencimento',
  status: 'Status',
}

export const CreditCard = ({ data }: CreditCardProps) => {
  data = { ...data, expires_at: dayjs(data.expires_at).format('DD/MM/YYYY') }
  const inspectionData = Object.entries(data).filter(item => item[0] !== 'id_credit')
  const downloadURL = `${process.env.NEXT_PUBLIC_BASE_URL_API}/credit/${data.id_credit}/download`

  const handleDownloadCAV = () => {
    if (typeof window !== 'undefined') {
      window.open(downloadURL, '_blank')
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[6px] overflow-hidden flex flex-col lg:flex-row lg:pr-4">
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(6,150px)] xl:grid-cols-[repeat(6,150px)] lg:p-4 border-dashed",
          "border-t-0 md:border-l-0 border-r-0 border-b-0",
          "[&>*:nth-child(-n+4)]:border-b [&>*:nth-child(2n-1)]:border-r",
          "md:[&>*:nth-child(3)]:border-r-0 md:[&>*:not(:nth-child(3n))]:border-r md:[&>*:nth-child(4)]:border-b-0",
          "lg:[&>*:nth-child(n)]:border-t-0 lg:[&>*:nth-child(n)]:border-l-0 lg:[&>*:nth-child(n)]:border-r-0 lg:[&>*:nth-child(n)]:border-b-0",
          "lg:[&>*:nth-child(n)]:border-r",
        )}
      >
        {inspectionData.map(([key, value], index) => (
          <div
            key={key}
            className="flex flex-col justify-center items-center p-4 lg:p-0 border-dashed"
          >
            <strong className="w-full text-center text-slate-900 text-sm font-bold mb-1">
              {creditsMapper[key as keyof CreditsDTO]}
            </strong>
            {index === 5 ? <StatusPill status={data.status} /> : (
              <span
                className={cn(
                  "w-full text-center text-sm rounded-md text-slate-500",
                )}
              >
                {value}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <div
          className={cn(
            "h-full w-full flex items-center justify-center",
          )}
        >
          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger
              disabled={data.status !== STATUS.ISSUED}
              className={cn(
                "md:flex hidden flex-1 gap-2 items-center justify-center bg-slate-100 px-2 py-2",
                "text-slate-800 font-medium text-sm ",
                " lg:rounded-md border-slate-200 border"
              )}
            >
              Opções
            </DropdownMenu.DropdownMenuTrigger>

            <DropdownMenu.Content
              align="end"
              className="shadow-lg py-1 bg-white rounded-b-md overflow-hidden"
            >
              <Button
                variant="ghost"
                disabled={data.status !== STATUS.ISSUED}
                asChild
              >
                <CAVDialog data={data} url={downloadURL} />
              </Button>

              <Button
                className="justify-start w-full py-2 px-4 hover:bg-slate-50 flex gap-2 items-center text-slate-700 font-normal text-sm disabled:cursor-not-allowed"
                variant="ghost"
                disabled={data.status !== STATUS.ISSUED}
                onClick={() => handleDownloadCAV()}
              >
                <Download size={16} strokeWidth={1.33} className="w-4 h-4 min-w-4 min-h-4" />
                Baixar certificado
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu.DropdownMenu>

          <div className="md:hidden grid grid-cols-2 w-full rounded-b-[6px] overflow-hidden bg-slate-200 border-t border-slate-200">
            <Button
              disabled={data.status !== STATUS.ISSUED}
              onClick={() => handleDownloadCAV()}
              className={cn(
                "flex flex-1 gap-2 items-center justify-center bg-slate-100 hover:bg-slate-100/80 px-2 py-2",
                "text-slate-800 font-medium text-sm disabled:cursor-not-allowed",
                " lg:rounded-md border-slate-200 border whitespace-nowrap",
                "rounded-none border-none mr-px"
              )}
            >
              <Download size={16} strokeWidth={2} />
              Baixar CAV
            </Button>

            <CAVDialog data={data} url={downloadURL} />

          </div>
        </div>
      </div>
    </div >
  );
};
