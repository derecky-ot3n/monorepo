import { Button } from "@/components/ui/button"
import * as Dialog from "@/components/ui/dialog"
import * as  ScrollArea from "@/components/ui/scroll-area"
import { Terms } from "./terms.ui"


export const TermsDialog = () => {
  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger className="underline">termo de aceite</Dialog.DialogTrigger>
      <Dialog.DialogContent className="p-0">
        <Dialog.DialogHeader className=" border-b border-slate-300 h-[75px] p-6 text-gray-900 font-semibold text-lg flex justify-center cursor-pointer">
          Termo de aceite
        </Dialog.DialogHeader>

        <ScrollArea.ScrollArea className=" w-full max-h-[350px] px-6 .scroll-color">
          <Terms />
        </ScrollArea.ScrollArea>

        <Dialog.DialogFooter className="border-t border-slate-300 p-6">
          <Dialog.DialogClose>
            <Button>Estou de acordo</Button>
          </Dialog.DialogClose>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog >
  )
}