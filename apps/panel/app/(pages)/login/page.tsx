"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "@/components/ui/link";
import Logo from "@/components/ui/logo";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm();

  const handleSubmit = form.handleSubmit((data) => {
    console.log("data", data);

    toast("Sucesso", {
      description: JSON.stringify(data),
      // description: "Acesso realizado com sucesso!",
    });
  });

  return (
    <div className="w-full h-screen flex flex-col-reverse md:flex-row">
      <div className="h-4/5 rounded-t-lg md:h-screen w-full md:w-6/12 flex justify-center items-center direction-reverse flex-col">
        <Logo />
        <form className="w-80 flex-col mt-20" onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl mb-8">Acessar</h1>

          <Label htmlFor="email">Email</Label>
          <Input
            className="mb-6"
            autoFocus
            id="email"
            type="email"
            {...form.register("email")}
          />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" {...form.register("password")} />

          <Button className="w-full my-8" type="submit">
            Entrar
          </Button>

          <div className="flex justify-between">
            <Link href="/forgot">Esqueci minha senha</Link>
            <Link href="/register" type="primary">
              Criar uma conta
            </Link>
          </div>
        </form>
      </div>
      <div className="h-1/5 md:h-screen w-full md:w-6/12 bg-auth" />
    </div>
  );
}
