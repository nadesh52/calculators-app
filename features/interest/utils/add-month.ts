/**
 * เพิ่มจำนวนเดือนให้ timestamp ของวันที่
 * สมมติว่า timestamp มาจาก date input และใช้ UTC midnight
 */
export function addMonthsToTimestamp(
  timestamp: number,
  months: number,
): number {
  const start = new Date(timestamp);
  const dayOfMonth = start.getUTCDate();

  // ตั้งเป็นวันที่ 1 ก่อน เพื่อป้องกันวันปลายเดือนล้นไปเดือนถัดไป
  const target = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + months, 1),
  );

  const lastDayOfTargetMonth = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();

  target.setUTCDate(Math.min(dayOfMonth, lastDayOfTargetMonth));

  return target.getTime();
}
