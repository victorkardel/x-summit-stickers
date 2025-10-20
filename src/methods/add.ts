import { stickerStore$ } from '../store/stickerStore';

/**
 * Add a sticker to the collection (increment count)
 */
export function addSticker(stickerId: number): void {
  const currentCount = stickerStore$[stickerId].get() || 0;
  stickerStore$[stickerId].set(currentCount + 1);
}
