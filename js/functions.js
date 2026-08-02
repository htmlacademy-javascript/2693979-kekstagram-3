const stringLengthValidation = (string, maxLength) => string.length <= maxLength;
stringLengthValidation('проверяемая строка', 20);

const checkPalindrome = (string) => {
  const cleaned = string.replaceAll(' ', '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');

  return cleaned === reversed;
};
checkPalindrome('топот');

const getNumberFromString = (value) => {
  const stringValue = value.toString();
  let result = '';

  for (let i = 0; i < stringValue.length; i++) {
    const currentChar = parseInt(stringValue[i], 10);
    if (!Number.isNaN(currentChar)) {
      result += stringValue[i];
    }
  }
  return parseInt(result, 10);
};
getNumberFromString('2023 год');

