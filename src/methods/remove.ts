import { stickerStore$ } from '../store/stickerStore';

/**
 * Remove a sticker from the collection (decrement count)
 */
export function removeSticker(stickerId: number): void {
  const currentCount = stickerStore$[stickerId].get() || 0;

  if (currentCount > 0) {
    if (currentCount === 1) {
      // Remove the key entirely if count becomes 0
      stickerStore$[stickerId].delete();
    } else {
      stickerStore$[stickerId].set(currentCount - 1);
    }
  }
}
