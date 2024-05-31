export const formatPhoneNumber = (value: string) => {
  let cleanedValue = value.replace(/\D/g, '')

  if (cleanedValue.length > 11) {
    cleanedValue = cleanedValue.slice(0, -1)
  }

  return cleanedValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
};