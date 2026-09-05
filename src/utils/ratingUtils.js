export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const RATING_LABELS = {
  1: 'Bad',
  2: 'Poor',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

/** True if the value is a valid rating: an integer between 1 and 5 inclusive. */
export function isValidRating(rating) {
  return (
    Number.isInteger(rating) && rating >= MIN_RATING && rating <= MAX_RATING
  );
}