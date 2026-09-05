function CalendarHeader({ label, onPrevMonth, onNextMonth }) {
  return (
    <div className="calendar-header">
      <button
        type="button"
        className="calendar-nav-btn"
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        {/* ‹ */}
      </button>
      <h2 className="calendar-title">{label}</h2>
      <button
        type="button"
        className="calendar-nav-btn"
        onClick={onNextMonth}
        aria-label="Next month"
      >
        {/* › */}
      </button>
    </div>
  );
}

export default CalendarHeader;
