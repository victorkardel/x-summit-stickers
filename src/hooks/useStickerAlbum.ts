import { useCallback } from 'react';
import { useSelector } from '@legendapp/state/react';
import { stickerStore$ } from '../store/stickerStore';
import { addSticker } from '../methods/add';
import { removeSticker } from '../methods/remove';
import { filterAll, filterMissing, filterRepeated } from '../methods/filters';
import { getCollectedCount, getMissingCount, getRepeatedCount, getStickerCount } from '../methods/stats';
import { STICKERS } from '../constants/stickers';
import type { Sticker } from '../constants/stickers';

export type TabType = 'all' | 'missing' | 'repeated';

export function useStickerAlbum() {
  // Get the sticker counts from Legend State with reactivity
  const stickerCounts = useSelector(() => stickerStore$.get());

  // Calculate statistics - computed inline to ensure reactivity
  const collectedCount = useSelector(() => getCollectedCount(stickerStore$.get()));
  const missingCount = useSelector(() => getMissingCount(STICKERS, stickerStore$.get()));
  const repeatedCount = useSelector(() => getRepeatedCount(stickerStore$.get()));

  // Filter stickers based on active tab
  const getFilteredStickers = useCallback((activeTab: TabType): Sticker[] => {
    switch (activeTab) {
      case 'all':
        return filterAll(STICKERS);
      case 'missing':
        return filterMissing(STICKERS, stickerCounts);
      case 'repeated':
        return filterRepeated(STICKERS, stickerCounts);
      default:
        return STICKERS;
    }
  }, [stickerCounts]);

  // Get count for a specific sticker
  const getCount = useCallback((stickerId: number): number => {
    return getStickerCount(stickerId, stickerCounts);
  }, [stickerCounts]);

  return {
    // State
    stickerCounts,

    // Stats
    collectedCount,
    missingCount,
    repeatedCount,

    // Methods
    addSticker,
    removeSticker,
    getFilteredStickers,
    getCount,
  };
}
