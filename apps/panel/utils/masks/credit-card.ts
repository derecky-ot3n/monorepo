export const formatCreditCard = (value: string) => {
  let cleanedValue = value.replace(/\D/g, '')

  if (cleanedValue.length > 16) {
    cleanedValue = cleanedValue.slice(0, -1)
  }

  return cleanedValue.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
};