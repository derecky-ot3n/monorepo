import { Input } from "../ui/input"
import { CopyToClipboardProps } from "./copy-to-clipboard.types"

export const CopyToClipboard = ({ value, copied = false }: CopyToClipboardProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center mt-4 border border-input pl-4 rounded group">
        <span className="text-sm text-slate-900 font-bold">Pix copia e cola:</span>

        <div className="relative flex flex-1 items-center">
          <Input
            disabled={true}
            value={value}
            className="w-full px-5 border-none"
          />
        </div>
      </div>

      {copied && <span className="text-xs text-emerald-400 font-normal">Copiado para área de transferência.</span>}
    </div>

  )
}