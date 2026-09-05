import CalendarDay from "./CalendarDay.jsx";
import { generateCalendarDays } from "../utils/calendarUtils.js";
import { isToday, isFutureDate, formatDate } from "../utils/dateUtils.js";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CalendarGrid({ year, month, selectedDate, onSelectDate, ratings }) {
  const days = generateCalendarDays(year, month);
  const selectedKey = selectedDate ? formatDate(selectedDate) : null;

  return (
    <div className="calendar-grid-wrapper">
      <div className="calendar-weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="calendar-weekday">
            {label}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map(({ date, isCurrentMonth }) => {
          const dateKey = formatDate(date);
          return (
            <CalendarDay
              key={dateKey}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday(date)}
              isFuture={isFutureDate(date)}
              isSelected={dateKey === selectedKey}
              rating={ratings[dateKey]}
              onSelectDate={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
