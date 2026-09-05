function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isFuture,
  isSelected,
  rating,
  onSelectDate,
}) {
  const classNames = [
    "calendar-day",
    !isCurrentMonth && "calendar-day--outside",
    isToday && "calendar-day--today",
    isFuture && "calendar-day--future",
    isSelected && "calendar-day--selected",
    rating && `calendar-day--rating-${rating}`,
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    if (isFuture) return;
    onSelectDate(date);
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      disabled={isFuture}
      aria-pressed={isSelected}
      aria-label={
        rating
          ? `${date.toDateString()}, rated ${rating} out of 5`
          : date.toDateString()
      }
    >
      <span className="calendar-day__number">{date.getDate()}</span>
    </button>
  );
}

export default CalendarDay;
