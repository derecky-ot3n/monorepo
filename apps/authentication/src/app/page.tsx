'use client'
import { Button } from "@ui/components/Button"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-white">AUTHENTICATION ON!</h1>
      <Button className="px-4 py-2 text-center text-red-500 font-bold bg-white/75" onClick={() => alert("Deu bom!")}>Teste botão</Button>
    </main>
  );
}
