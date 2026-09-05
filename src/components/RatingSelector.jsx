import { useEffect, useState } from "react";
import {
  isValidRating,
  MIN_RATING,
  MAX_RATING,
  RATING_LABELS,
} from "../utils/ratingUtils.js";
import { isFutureDate } from "../utils/dateUtils.js";

const RATING_VALUES = Array.from(
  { length: MAX_RATING - MIN_RATING + 1 },
  (_, i) => MIN_RATING + i,
);

function RatingSelector({ date, currentRating, onSave, onClear }) {
  const [draftRating, setDraftRating] = useState(currentRating ?? null);

  useEffect(() => {
    setDraftRating(currentRating ?? null);
  }, [date, currentRating]);

  const dateIsFuture = isFutureDate(date);
  const canSave = isValidRating(draftRating) && !dateIsFuture;

  function handleSave() {
    if (!canSave) return;
    onSave(date, draftRating);
  }

  function handleClear() {
    onClear(date);
  }

  return (
    <div className="rating-selector">
      <h3 className="rating-selector__date">
        {date.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>

      {dateIsFuture ? (
        <p className="rating-selector__prompt rating-selector__prompt--warning">
          You can't rate a future date.
        </p>
      ) : (
        <p className="rating-selector__prompt">How was your day?</p>
      )}

      <div
        className="rating-selector__options"
        role="radiogroup"
        aria-label="Day rating"
      >
        {RATING_VALUES.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={draftRating === value}
            className={
              "rating-option" +
              (draftRating === value ? " rating-option--selected" : "")
            }
            onClick={() => setDraftRating(value)}
            disabled={dateIsFuture}
          >
            <span className="rating-option__stars">{"⭐".repeat(value)}</span>
            <span className="rating-option__label">
              {value} · {RATING_LABELS[value]}
            </span>
          </button>
        ))}
      </div>

      <div className="rating-selector__actions">
        <button
          type="button"
          className="rating-btn rating-btn--save"
          onClick={handleSave}
          disabled={!canSave}
        >
          Save Rating
        </button>
        <button
          type="button"
          className="rating-btn rating-btn--clear"
          onClick={handleClear}
          disabled={currentRating == null}
        >
          Clear Rating
        </button>
      </div>
    </div>
  );
}

export default RatingSelector;
