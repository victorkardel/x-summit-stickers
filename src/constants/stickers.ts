export const TOTAL_STICKERS = 143;

export interface Sticker {
  id: number;
  name: string;
  imageUrl?: string;
}

export const STICKERS: Sticker[] = Array.from({ length: TOTAL_STICKERS }, (_, i) => ({
  id: i + 1,
  name: `Sticker #${i + 1}`,
  imageUrl: undefined, // Placeholder for future images
}));

export const EVENT_NAME = 'X Summit 2025';
