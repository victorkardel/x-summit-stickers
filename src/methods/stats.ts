import type { StickerCounts } from '../utils/storage';
import type { Sticker } from '../constants/stickers';

/**
 * Get the number of unique stickers collected
 */
export function getCollectedCount(counts: StickerCounts): number {
  return Object.keys(counts).length;
}

/**
 * Get the number of missing stickers
 */
export function getMissingCount(allStickers: Sticker[], counts: StickerCounts): number {
  return allStickers.filter(sticker => !counts[sticker.id] || counts[sticker.id] === 0).length;
}

/**
 * Get the number of repeated stickers
 */
export function getRepeatedCount(counts: StickerCounts): number {
  return Object.values(counts).filter(count => count > 1).length;
}

/**
 * Get the count for a specific sticker
 */
export function getStickerCount(stickerId: number, counts: StickerCounts): number {
  return counts[stickerId] || 0;
}
