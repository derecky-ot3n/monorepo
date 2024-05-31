import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat);

export const isValidExpireDate = (expireDate: string) => {
  const now = dayjs()
  const expire = dayjs(expireDate, 'MM/YY')

  const hasExpired =
    now.isBefore(expire, 'month') ||
    now.isSame(expire, 'month')

  return hasExpired
}