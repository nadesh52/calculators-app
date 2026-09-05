export function getDayDiff(startDate: any, endDate: any) {
  const timeDiff = endDate - startDate;
  const milliSecPerDay = 1000 * 60 * 60 * 24;
  const dayDiff = timeDiff / milliSecPerDay;

  return dayDiff;
}
