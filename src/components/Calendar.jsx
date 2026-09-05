import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import RatingSelector from "./RatingSelector.jsx";
import ColorLegend from "./ColorLegend.jsx";
import { formatDate } from "../utils/dateUtils.js";
import {
  getAllRatings,
  saveRating,
  deleteRating,
} from "../storage/ratingStorage.jsx";

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [ratings, setRatings] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted ratings once, on mount.
  useEffect(() => {
    let cancelled = false;

    getAllRatings().then((stored) => {
      if (!cancelled) {
        setRatings(stored);
        setIsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  async function handleSaveRating(date, rating) {
    try {
      const updated = await saveRating(date, rating);
      setRatings(updated);
    } catch (error) {
      console.error("Failed to save rating:", error.message);
      // Nothing to roll back — local state was never optimistically updated,
      // so the UI already reflects reality (the save simply didn't happen).
    }
  }

  async function handleClearRating(date) {
    const updated = await deleteRating(date);
    setRatings(updated);
    setSelectedDate(null);
  }

  const label = `${MONTH_LABELS[viewMonth]} ${viewYear}`;
  const selectedRating = selectedDate
    ? ratings[formatDate(selectedDate)]
    : undefined;

  if (!isLoaded) {
    return <div className="calendar calendar--loading">Loading…</div>;
  }

  return (
    <div className="calendar">
      <CalendarHeader
        label={label}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGrid
        year={viewYear}
        month={viewMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        ratings={ratings}
      />
      <ColorLegend />
      {selectedDate && (
        <RatingSelector
          date={selectedDate}
          currentRating={selectedRating}
          onSave={handleSaveRating}
          onClear={handleClearRating}
        />
      )}
    </div>
  );
}

export default Calendar;
