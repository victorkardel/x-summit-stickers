import type { Sticker } from '../constants/stickers';
import type { StickerCounts } from '../utils/storage';

/**
 * Filter stickers that are missing (count = 0 or not in collection)
 */
export function filterMissing(stickers: Sticker[], counts: StickerCounts): Sticker[] {
  return stickers.filter(sticker => !counts[sticker.id] || counts[sticker.id] === 0);
}

/**
 * Filter stickers that are repeated (count > 1)
 */
export function filterRepeated(stickers: Sticker[], counts: StickerCounts): Sticker[] {
  return stickers.filter(sticker => counts[sticker.id] && counts[sticker.id] > 1);
}

/**
 * Get all stickers (no filter)
 */
export function filterAll(stickers: Sticker[]): Sticker[] {
  return stickers;
}
