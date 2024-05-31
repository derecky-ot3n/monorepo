import { HighlightTitleProps } from "./highlight-title.types"

export const HighlightTitle = ({ title, subtitle }: HighlightTitleProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-slate-900 font-bold text-xl sm:text-2xl leading-6 text-center">{title}</h1>
      <span className="text-slate-700 font-normal text-sm sm:text-base leading-6 text-center">{subtitle}</span>
    </div>
  )
}