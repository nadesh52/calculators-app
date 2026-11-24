export function getDayCount(start: number, end: number) {
  const DAY_IN_MS = 1000 * 60 * 60 * 24;

  return Math.ceil((end - start) / DAY_IN_MS);
}
