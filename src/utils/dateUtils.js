/**
 * Formats a Date object as YYYY-MM-DD using LOCAL date components.
 * We deliberately avoid toISOString() here — it converts to UTC and
 * can shift the date by a day depending on the user's timezone offset.
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** True if the given date is the same calendar day as "now", locally. */
export function isToday(date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * True if the given date is strictly after today (calendar-date comparison,
 * not timestamp comparison — both dates are normalized to midnight first).
 */
export function isFutureDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  return compareDate.getTime() > today.getTime();
}
