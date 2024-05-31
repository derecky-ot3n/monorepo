"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInquiryVehicleForm } from "./inquiry-vehicle-form.hook";
import { TermsDialog } from "../terms-dialog/terms-dialog.ui";
import { PolicyDialog } from "../policy-dialog/policy-dialog.ui";
import Script from "next/script";

export function InquiryVehicleForm() {
  const {
    handleSubmit,
    register,
    errors,
    isValid,
    handleRenavamChange,
    handleYearOfExerciseChange,
    handleChangePlate,
    turnstileToken,
    prepareTurnstileWidget
  } = useInquiryVehicleForm()

  return (
    <form className=" border-slate-200 border rounded-lg flex flex-col gap-6 p-6 bg-white max-w-[448px]">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer
        onReady={prepareTurnstileWidget}
      />

      <div className="grid md:grid-cols-[1fr_3fr] items-center">
        <Label className="w-full mb-2 md:mt-0 md:min-w-[100px] text-sm font-medium">
          Placa
        </Label>

        <Input
          className="w-full md:min-w-[300px] placeholder:text-slate-300"
          placeholder="ABC1D23"
          autoFocus
          {...register("plate")}
          onChange={(e) => handleChangePlate(e)}
        />

        <span className="text-red-600 text-xs font-normal md:col-start-2 md:col-span-2 pt-1">
          {errors.plate?.message}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_3fr] items-center">
        <Label className="w-full mb-2 md:mt-0 md:min-w-[100px] text-sm font-medium">
          Renavam
        </Label>

        <Input
          className="w-full md:min-w-[300px] placeholder:text-slate-300"
          placeholder="12345678910"
          {...register("renavam")}
          onChange={(e) => handleRenavamChange(e)}
        />

        <span className="text-red-600 text-xs font-normal md:col-start-2 md:col-span-2 pt-1">
          {errors.renavam?.message}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_3fr] items-center">
        <Label className="w-full mb-2 md:mt-0 md:min-w-[100px] text-sm font-medium">
          Exercício
        </Label>

        <Input
          className="w-full md:min-w-[300px] placeholder:text-slate-300"
          placeholder="12345678910"
          {...register("yearOfExercise")}
          onChange={(e) => handleYearOfExerciseChange(e)}
          value={2024}
          disabled
        />

        <span className="text-red-600 text-xs font-normal md:col-start-2 md:col-span-2 pt-1">
          {errors.yearOfExercise?.message}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_3fr] items-center justify-end min-h-[63px] w-full">
        <input type="hidden" {...register("captcha_token")} value={turnstileToken} />

        <div
          className="cf-turnstile md:col-start-2 md:col-span-2 "
          id="explicit-container"
          data-theme="light"
          data-language="pt-br"
          data-appearence="execute"
        />
      </div>

      <div className="grid md:grid-cols-[1fr_3fr] items-center gap-2 ">
        <Button
          className="md:col-start-2 md:col-span-2 md:min-w-[300px]"
          onClick={async (data) => await handleSubmit(data)}
          disabled={!isValid}
        >
          Consultar
        </Button>

        <span className="text-slate-600 text-center text-xs md:self-end md:w-[284px] md:text-start md:col-span-2 md:col-start-2 mt-4">
          Ao consultar, você está de acordo com nossos <TermsDialog /> e{" "}
          <PolicyDialog />.
        </span>
      </div>
    </form>
  );
}
