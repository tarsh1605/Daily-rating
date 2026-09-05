import { RATING_LABELS, MIN_RATING, MAX_RATING } from "../utils/ratingUtils.js";

const RATING_VALUES = Array.from(
  { length: MAX_RATING - MIN_RATING + 1 },
  (_, i) => MIN_RATING + i,
);

function ColorLegend() {
  return (
    <div className="color-legend" aria-label="Rating color legend">
      {RATING_VALUES.map((value) => (
        <div key={value} className="color-legend__item">
          <span
            className={`color-legend__swatch color-legend__swatch--${value}`}
          />
          <span className="color-legend__label">
            {value} · {RATING_LABELS[value]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ColorLegend;
