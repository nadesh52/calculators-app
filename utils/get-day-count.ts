export function getDayCount(dateTimestamp: number, monthDuration: number) {
  const endDate = new Date(dateTimestamp);

  endDate.setMonth(endDate.getMonth() + monthDuration);

  return (endDate.getTime() - dateTimestamp) / (1000 * 60 * 60 * 24);
}
