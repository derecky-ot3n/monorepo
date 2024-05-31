export function isValidCreditCard(number: string): boolean {
  const cleanedNumber = number.replace(/\D/g, '');

  const reversedNumber = cleanedNumber.split('').reverse().join('');

  let sum = 0;
  for (let i = 0; i < reversedNumber.length; i++) {
    let digit = parseInt(reversedNumber[i]);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}