import { observable } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import type { StickerCounts } from '../utils/storage';

// Create the observable store
export const stickerStore$ = observable<StickerCounts>({});

// Configure persistence with localStorage
persistObservable(stickerStore$, {
  local: 'sticker-album-data',
  pluginLocal: ObservablePersistLocalStorage,
});
