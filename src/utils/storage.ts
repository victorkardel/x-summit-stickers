const STORAGE_KEY = 'sticker-album-data';

export interface StickerCounts {
  [stickerId: number]: number;
}

/**
 * Get all sticker counts from localStorage
 */
export function getStickerCounts(): StickerCounts {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
}

/**
 * Save sticker counts to localStorage
 */
export function saveStickerCounts(counts: StickerCounts): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Increment the count for a specific sticker
 */
export function incrementStickerCount(stickerId: number): StickerCounts {
  const counts = getStickerCounts();
  counts[stickerId] = (counts[stickerId] || 0) + 1;
  saveStickerCounts(counts);
  return counts;
}

/**
 * Decrement the count for a specific sticker (minimum 0)
 */
export function decrementStickerCount(stickerId: number): StickerCounts {
  const counts = getStickerCounts();
  if (counts[stickerId] && counts[stickerId] > 0) {
    counts[stickerId] -= 1;
    if (counts[stickerId] === 0) {
      delete counts[stickerId];
    }
    saveStickerCounts(counts);
  }
  return counts;
}

/**
 * Get the count for a specific sticker
 */
export function getStickerCount(stickerId: number): number {
  const counts = getStickerCounts();
  return counts[stickerId] || 0;
}

/**
 * Clear all sticker data
 */
export function clearStickerData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
