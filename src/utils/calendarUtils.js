const DAYS_PER_WEEK = 7;

/** Number of days in the given month. month is 0-indexed (0 = January). */
export function getDaysInMonth(year, month) {
  // Day 0 of "next month" is the last day of "this month".
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Weekday index of the 1st of the month, remapped so Monday = 0 ... Sunday = 6
 * (JS Date's native getDay() has Sunday = 0, which doesn't match our layout).
 */
export function getFirstDayOfMonth(year, month) {
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}

/**
 * Builds a flat array of calendar cells for the given month, padded with
 * leading days from the previous month and trailing days from the next
 * month so the total length is always a multiple of 7 (full weeks only).
 *
 * Each cell: { date: Date, isCurrentMonth: boolean }
 */
export function generateCalendarDays(year, month) {
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const days = [];

  // Leading days from the previous month
  for (let i = firstDayOffset; i > 0; i--) {
    const day = daysInPrevMonth - i;
    days.push({
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
    });
  }

  // Days of the current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  // Trailing days from the next month, to complete the final week
  const remainder = days.length % DAYS_PER_WEEK;
  if (remainder !== 0) {
    const daysToAdd = DAYS_PER_WEEK - remainder;
    for (let day = 1; day <= daysToAdd; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }
  }

  return days;
}
