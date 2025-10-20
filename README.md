# X Summit 2025 | Sticker Album

A mobile-first sticker collection tracker for the X Summit 2025 event. Built with TanStack Start, React, and Legend State.

## Features

- 📱 Mobile-first responsive design
- 🎨 Real-time sticker tracking with visual states
- 💾 Persistent storage using localStorage
- ✨ Animated background effects
- 🎯 Three viewing modes: Complete, Missing, and Repeated stickers

### Sticker States

- **Missing** (0 collected): Blue badge and border
- **Has One** (1 collected): Red badge and border
- **Repeated** (>1 collected): Yellow badge and border

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React)
- **State Management**: [Legend State](https://legendapp.com/open-source/state/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Install dependencies using pnpm:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

## Deployment

This app is configured for deployment to Cloudflare Workers. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick deploy:
```bash
pnpm deploy
```

## Project Structure

```
src/
├── components/
│   ├── StickerCard.tsx           # Individual sticker card component
│   └── ui/
│       └── background-beams-with-collision.tsx
├── constants/
│   └── stickers.ts               # Sticker data (143 stickers)
├── hooks/
│   └── useStickerAlbum.ts        # Main hook for sticker state
├── methods/
│   ├── add.ts                    # Add sticker logic
│   ├── remove.ts                 # Remove sticker logic
│   ├── filters.ts                # Filter stickers by state
│   └── stats.ts                  # Calculate statistics
├── routes/
│   ├── __root.tsx                # Root layout
│   └── index.tsx                 # Main page
├── store/
│   └── stickerStore.ts           # Legend State store
└── utils/
    └── storage.ts                # Storage type definitions
```

## Features Details

### Sticker Collection
- Click on a sticker to add it to your collection
- Click "Remove One" button to decrease the count
- Automatic categorization into Missing, Has One, and Repeated states

### Progress Tracking
- Visual progress bar showing collection completion
- Real-time counter updates
- Filtered views for different sticker states

### Local Storage
All sticker data is automatically persisted to localStorage, so your collection is saved between sessions.

## License

MIT
