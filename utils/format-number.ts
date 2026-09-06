export const formatNumber = (n: any) => {
  const num = Number(n);
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
