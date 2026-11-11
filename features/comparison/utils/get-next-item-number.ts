export const getNextItemNumber = (items: any[]) => {
  const usedNumbers = new Set(items.map((item) => item.number));

  let number = 1;

  while (usedNumbers.has(number)) {
    number++;
  }

  return number;
};
