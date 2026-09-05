// Provides an in-memory fallback for chrome.storage.local when running
// outside an actual extension context (e.g. `npm run dev` in a normal
// browser tab). This file is dev-convenience only — the real extension
// build always has the genuine chrome.storage.local API available.

const memoryStore = {};

const fallback = {
  local: {
    async get(key) {
      return { [key]: memoryStore[key] };
    },
    async set(items) {
      Object.assign(memoryStore, items);
    },
  },
};

export const storageArea =
  typeof chrome !== 'undefined' && chrome.storage
    ? chrome.storage
    : fallback;