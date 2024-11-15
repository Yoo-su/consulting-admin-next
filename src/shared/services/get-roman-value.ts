export type RomanValuesType = 'lower' | 'upper';
export const getRomanValues = (
  num: number,
  type: RomanValuesType = 'upper'
) => {
  const romanSymbols = [
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
    ['', 'M', 'MM', 'MMM'],
  ];
  const result =
    romanSymbols[3][Math.floor(num / 1000)] +
    romanSymbols[2][Math.floor((num % 1000) / 100)] +
    romanSymbols[1][Math.floor((num % 100) / 10)] +
    romanSymbols[0][num % 10];

  return type === 'lower' ? result.toLowerCase() : result;
};
