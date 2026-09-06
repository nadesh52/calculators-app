export function interestCalculator(
  _amount: number,
  _rate: number,
  _day: number
) {
  const amount = Number(_amount);
  const rate = _rate / 100;

  const result = (amount * rate * _day) / 365;

  return formatNumberToFixed(result);
}

const formatNumberToFixed = (num: any) => {
  const res = parseFloat(num).toFixed(2);
  return Number(res);
};
