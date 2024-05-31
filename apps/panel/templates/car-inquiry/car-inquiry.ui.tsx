'use client'

import { HighlightTitle } from "@/components/highlight-title"
import { InquiryVehicleForm } from "@/templates/car-inquiry/components/inquiry-vehicle-form"
import { useSimulationStore } from "@/store/simulation"
import { Loading } from "./components/loading/loading.ui"

export const CarInquiry = () => {
  const { state: { isLoading } } = useSimulationStore()

  return (
    <div className="pb-8 md:pb-0 w-full h-full flex justify-center items-start">
      {isLoading ?
        <Loading /> :
        <div className="flex flex-col gap-8 mt-8 md:mt-14">
          <HighlightTitle
            title="Emissão de Crédito de Carbono"
            subtitle="Preencha os campos para realizar a consulta."
          />

          <InquiryVehicleForm />

          {/* <div className="flex gap-2 items-center mt-4">
            <Avatar.AvatarGroup limit={3}>
              <Avatar.AvatarGroupList>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Avatar.Avatar key={i} className="border-[2px] border-white">
                    <Avatar.AvatarImage
                      src={`https://xsgames.co/randomusers/assets/avatars/female/${i}.jpg`}
                      alt="@shadcn"
                    />
                    <Avatar.AvatarFallback>CN</Avatar.AvatarFallback>
                  </Avatar.Avatar>
                ))}
              </Avatar.AvatarGroupList>
            </Avatar.AvatarGroup>

            <p><strong>+ 6.831.942</strong> de pessoas já consultaram</p>
          </div> */}
        </div>
      }
    </div>
  )
}