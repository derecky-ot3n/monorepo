"use client";

import { Copy, CreditCard, RotateCw, TimerReset } from "lucide-react";
import QRCode from "react-qr-code";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Tabs from "@/components/ui/tabs";
import { Stepper } from "./stepper/stepper.ui";
import { usePaymentForm } from "./payment-form.hook";
import { CopyToClipboard } from "@/components/copy-to-clipboard/copy-to-clipboard.ui";
import { usePaymentStore } from "@/store/payment";
import { cn } from "@/lib/utils";
import { PAYMENT_TYPES, type PaymentType } from "@/utils/enums/payment-types";

export function PaymentForm() {
  const {
    handlers: {
      handleChangeCVV,
      handleChangeCpfCnpjField,
      handleChangeCreditCardNumber,
      handleChangeExpireDate,
      handleChangePhoneNumber,
      handlePayByPix,
      handleSelectTab,
      handleSubmit,
    },
    form: { errors, register },
    states: {
      copied,
      count,
      currentStep,
      formattedCount,
      isPix,
      isValid,
      isValidStep1,
      isValidStep2,
    },
    stepper: { next, prev },
  } = usePaymentForm();
  const {
    state: { paymentPixData, hasGeneratedPayment, isLoading, paymentStatus },
  } = usePaymentStore();

  const inputOptions = {
    shouldUnregister: !isPix ? true : false,
  };

  return (
    <section>
      <Stepper currentStep={currentStep} />

      <div className="border-slate-200 border rounded-lg xs:mt-8">
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <section id="step-1" className="flex flex-col gap-6 p-6">
              <h3 className="font-medium text-base text-black">
                Preencha os dados do pagador
              </h3>

              <div>
                <Label
                  className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm"
                  htmlFor="fullName"
                >
                  Nome completo
                </Label>
                <Input
                  placeholder="Ex.: João da Silva"
                  id="fullName"
                  autoFocus
                  {...register("fullName")}
                />
                <span className="text-red-600 text-xs font-normal">
                  {errors.fullName?.message}
                </span>
              </div>

              <div>
                <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm">
                  CPF ou CNPJ
                </Label>
                <Input
                  placeholder="000.000.000-00 | 00.000.000/0000-00"
                  {...register("cpfOrCnpj")}
                  onChange={(e) => handleChangeCpfCnpjField(e)}
                />
                <span className="text-red-600 text-xs font-normal">
                  {errors.cpfOrCnpj?.message}
                </span>
              </div>

              <div>
                <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm">
                  Celular
                </Label>
                <Input
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                  onChange={(e) => handleChangePhoneNumber(e)}
                />
                <span className="text-red-600 text-xs font-normal">
                  {errors.phone?.message}
                </span>
              </div>

              <div>
                <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm">
                  Email
                </Label>
                <Input placeholder="email@exemplo.com" {...register("email")} />
                <span className="text-red-600 text-xs font-normal">
                  {errors.email?.message}
                </span>
                <div className="font-normal text-sm text-slate-500 mt-2">
                  O email é o principal canal para atualizações sobre o seu CAV
                  (Compensação Ambiental Veicular), e é importante que esteja
                  correto.
                </div>
              </div>

              <Button type="button" disabled={!isValidStep1} onClick={next}>
                Continuar
              </Button>
            </section>
          )}

          {currentStep === 1 && (
            <section id="step-2" className="flex flex-col p-6">
              <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm mb-2">
                Como você quer pagar?
              </Label>

              <input type="hidden" {...register("type")} />
              <Tabs.Tabs
                defaultValue={PAYMENT_TYPES.CREDIT_CARD}
                onValueChange={(id) => handleSelectTab(id as PaymentType)}
              >
                <Tabs.TabsList className="w-full h-auto p-0 m-0 rounded-[8px] overflow-hidden mt-2">
                  <Tabs.TabsTrigger
                    className="group w-full gap-2.5"
                    value={PAYMENT_TYPES.CREDIT_CARD}
                  >
                    <CreditCard
                      size={14}
                      className="group-data-[state=active]:text-primary"
                    />
                    Cartão de crédito
                  </Tabs.TabsTrigger>
                  <Tabs.TabsTrigger
                    className="w-full gap-2.5 group"
                    value={PAYMENT_TYPES.PIX}
                  >
                    <svg
                      className="group-data-[state=active]:text-primary"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_405_28209)">
                        <path
                          d="M3.96641 4.00022H3.73975L6.41975 1.32022C7.29308 0.450225 8.70641 0.450225 9.57975 1.32022L12.2597 4.00022H12.0331C11.4997 4.00022 10.9964 4.20689 10.6197 4.58689L8.35308 6.84356C8.15641 7.04023 7.84308 7.04023 7.64641 6.84356L5.37975 4.58689C5.00308 4.20689 4.49975 4.00022 3.96641 4.00022Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12.0331 11.9999H12.2597L9.57975 14.6799C8.70641 15.5499 7.29308 15.5499 6.41975 14.6799L3.73975 11.9999H3.96641C4.49975 11.9999 5.00308 11.7932 5.37975 11.4132L7.64641 9.15653C7.84308 8.95987 8.15641 8.95987 8.35308 9.15653L10.6197 11.4132C10.9964 11.7932 11.4997 11.9999 12.0331 11.9999Z"
                          fill="currentColor"
                        />
                        <path
                          d="M14.68 9.58008L12.9266 11.3334H12.0333C11.6766 11.3334 11.3433 11.1934 11.09 10.9434L8.82331 8.68341C8.36998 8.23008 7.62998 8.23008 7.17665 8.68341L4.90998 10.9434C4.65665 11.1934 4.32331 11.3334 3.96665 11.3334H3.07331L1.31998 9.58008C0.449981 8.70675 0.449981 7.29341 1.31998 6.42008L3.07331 4.66675H3.96665C4.32331 4.66675 4.65665 4.80675 4.90998 5.05675L7.17665 7.31675C7.40331 7.54341 7.70331 7.65675 7.99998 7.65675C8.29665 7.65675 8.59665 7.54341 8.82331 7.31675L11.09 5.05675C11.3433 4.80675 11.6766 4.66675 12.0333 4.66675H12.9266L14.68 6.42008C15.55 7.29341 15.55 8.70675 14.68 9.58008Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_405_28209">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Pix
                  </Tabs.TabsTrigger>
                </Tabs.TabsList>
                <Tabs.TabsContent
                  value={PAYMENT_TYPES.CREDIT_CARD}
                  className="flex flex-col gap-4 mt-6"
                >
                  <div>
                    <Label
                      className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm"
                      htmlFor="cardName"
                    >
                      Nome do titular do cartão
                    </Label>
                    <Input
                      id="cardName"
                      autoFocus
                      placeholder="Ex.: João da Silva"
                      {...register("cardName", inputOptions)}
                    />
                    <span className="text-red-600 text-xs font-normal">
                      {errors.cardName?.message}
                    </span>
                  </div>

                  <div>
                    <Label
                      className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm"
                      htmlFor="cardName"
                    >
                      Número do cartão
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="1234 5678 9101"
                      {...register("cardNumber", inputOptions)}
                      onChange={(e) => handleChangeCreditCardNumber(e)}
                    />
                    <span className="text-red-600 text-xs font-normal">
                      {errors.cardNumber?.message}
                    </span>
                  </div>

                  <div>
                    <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm">
                      Vencimento
                    </Label>
                    <Input
                      placeholder="MM/AA"
                      {...register("expire", inputOptions)}
                      onChange={(e) => handleChangeExpireDate(e)}
                    />
                    <span className="text-red-600 text-xs font-normal">
                      {errors.expire?.message}
                    </span>
                  </div>

                  <div>
                    <Label className="after:content-['*'] after:text-red-600 after:ml-0.5 font-medium text-sm">
                      CVV
                    </Label>
                    <Input
                      placeholder="123"
                      {...register("cvv", inputOptions)}
                      onChange={(e) => handleChangeCVV(e)}
                    />
                    <span className="text-red-600 text-xs font-normal">
                      {errors.cvv?.message}
                    </span>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row gap-4 mt-4 sm:mt:0">
                    <Button
                      type="button"
                      onClick={() => prev()}
                      variant="outline"
                    >
                      Voltar
                    </Button>

                    <Button
                      type="submit"
                      disabled={!isValidStep2 || !isValid || isLoading}
                      className="w-full"
                    >
                      Pagar
                    </Button>
                  </div>
                </Tabs.TabsContent>
                <Tabs.TabsContent value={PAYMENT_TYPES.PIX}>
                  <h3 className="text-slate-900 font-bold text-base text-center mt-6">
                    Confirme sua compra pagando com o Pix
                  </h3>
                  <span className="block text-slate-600 font-normal text-normal text-center">
                    Escaneie o QR Code ou copie e cole o código.
                  </span>

                  {hasGeneratedPayment && isPix ? (
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="relative mt-9 mb-5">
                        <QRCode
                          className="w-[175px] h-[175px]"
                          value={paymentPixData?.code!}
                        />
                        <div
                          className={cn(
                            "absolute left-0 top-0 right-0 w-full h-full bg-white/70",
                            count === 0 ? "block" : "hidden"
                          )}
                        />
                      </div>

                      <span
                        className={cn(
                          "flex gap-2 text-red-600",
                          count === 0 ? "text-red-600" : "text-slate-900"
                        )}
                      >
                        <TimerReset size={20} />
                        <p className="text-base font-normal">
                          Expira em
                          <strong className="mx-1 font-semibold">
                            {formattedCount}
                          </strong>
                          minutos
                        </p>
                      </span>

                      <CopyToClipboard value={paymentPixData?.code!} />
                    </div>
                  ) : null}

                  <div className="flex flex-col-reverse sm:flex-row gap-4 mt-4 sm:mt:0">
                    <Button type="button" onClick={prev} variant="outline">
                      Voltar
                    </Button>

                    <Button
                      className="w-full"
                      onClick={() => handlePayByPix()}
                      disabled={isLoading}
                    >
                      {!paymentPixData ? (
                        "Gerar QR Code"
                      ) : count === 0 ? (
                        <>
                          <RotateCw size={16} />
                          <span className="ml-2">Gerar novo QR Code</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span className="ml-2">Copiar código</span>
                        </>
                      )}
                    </Button>
                  </div>
                </Tabs.TabsContent>
              </Tabs.Tabs>
            </section>
          )}
        </form>
      </div>
    </section>
  );
}
