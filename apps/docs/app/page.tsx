'use client'

import Image from "next/image"
import { Button } from "@ui/components/button"

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-white text-4xl">MONOREPO: DOCS!!</h1>
      <Button className="mt-8" onClick={() => alert("Deu bom")}>Teste MONOREPO BUTTON</Button>
    </main>
  )
}