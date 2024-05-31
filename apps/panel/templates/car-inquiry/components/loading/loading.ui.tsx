import Image from "next/image"

export const Loading = () => {
  return (
    <div className="flex flex-1 flex-col w-full h-full justify-start items-center md:mt-8">
      <Image
        src="/loading.gif"
        width={240}
        height={240}
        alt="loading image"
      />

      <div className="inline-flex items-baseline mt-8">
        <span className="text-slate-900 font-normal text-lg">Consultando...</span>
      </div>
    </div>
  )
}