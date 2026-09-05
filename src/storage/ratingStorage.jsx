import { formatDate, isFutureDate } from "../utils/dateUtils.js";
import { isValidRating } from "../utils/ratingUtils.js";
import { storageArea } from "./chromeStorageShim.js";

const STORAGE_KEY = "ratings";

export async function getAllRatings() {
  const result = await storageArea.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] ?? {};
}

export async function getRating(date) {
  const all = await getAllRatings();
  return all[formatDate(date)];
}

export async function saveRating(date, rating) {
  if (!isValidRating(rating)) {
    throw new Error(`Invalid rating: ${rating}. Must be an integer 1-5.`);
  }
  if (isFutureDate(date)) {
    throw new Error("Cannot save a rating for a future date.");
  }

  const all = await getAllRatings();
  const key = formatDate(date);
  const updated = { ...all, [key]: rating };

  await storageArea.local.set({ [STORAGE_KEY]: updated });
  return updated;
}

export async function deleteRating(date) {
  const all = await getAllRatings();
  const key = formatDate(date);

  if (!(key in all)) return all;

  const updated = { ...all };
  delete updated[key];

  await storageArea.local.set({ [STORAGE_KEY]: updated });
  return updated;
}
