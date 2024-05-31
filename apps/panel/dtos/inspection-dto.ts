import { CreditsDTO } from "./credits-dto"

export type InspectionDTO = {
  page: number,
  page_size: number,
  total: number,
  data: CreditsDTO[]
}
