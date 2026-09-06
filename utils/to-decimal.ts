export const toDecimal = (num: number, digit = 2) => {
  return Number((Math.round(num * 100) / 100).toFixed(digit)).toLocaleString();
};
