import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useRef, useEffect } from 'react'
import { Album, FileX, Copy } from 'lucide-react'
import { STICKERS, EVENT_NAME } from '../constants/stickers'
import { StickerCard } from '../components/StickerCard'
import { useStickerAlbum, type TabType } from '../hooks/useStickerAlbum'
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const mainContentRef = useRef<HTMLElement>(null)

  // Use Legend State hook
  const {
    collectedCount,
    missingCount,
    repeatedCount,
    addSticker,
    removeSticker,
    getFilteredStickers,
    getCount,
  } = useStickerAlbum()

  // Filter stickers based on active tab
  const filteredStickers = useMemo(() => {
    return getFilteredStickers(activeTab)
  }, [activeTab, getFilteredStickers])

  // Scroll to top smoothly when tab changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [activeTab])

  return (
    <div className="h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-black border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Logo */}
            <img
              src="/x-summit.png"
              alt="X Summit Logo"
              className="h-20 w-auto object-contain"
            />
            <p className="text-sm font-bold text-white">Sticker Album</p>
          </div>
          <div className="mt-3 w-full px-4">
            <div className="text-center text-white text-sm mb-2">
              <span className="font-semibold">{collectedCount}</span> / {STICKERS.length} collected
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[rgba(43,113,184,1)] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(collectedCount / STICKERS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main ref={mainContentRef} className="flex-1 overflow-y-auto pb-20 relative">
        {filteredStickers.length === 0 ? (
          <div className="h-full flex items-center justify-center bg-black">
            <div className="flex flex-col items-center justify-center text-gray-400 relative z-10">
              <Copy className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">No stickers here yet!</p>
              <p className="text-sm mt-2">
                {activeTab === 'missing' && 'You have collected all stickers!'}
                {activeTab === 'repeated' && 'Add duplicates to see them here.'}
              </p>
            </div>
          </div>
        ) : (
          <BackgroundBeamsWithCollision className="min-h-full">
            <div className="px-4 py-6 w-full relative z-10">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {filteredStickers.map((sticker) => (
                  <StickerCard
                    key={sticker.id}
                    sticker={sticker}
                    count={getCount(sticker.id)}
                    onIncrement={() => addSticker(sticker.id)}
                    onDecrement={() => removeSticker(sticker.id)}
                  />
                ))}
              </div>
            </div>
          </BackgroundBeamsWithCollision>
        )}
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="sticky bottom-0 z-10 bg-black border-t border-gray-800 shadow-lg">
        <div className="grid grid-cols-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeTab === 'all'
                ? 'bg-[rgba(43,113,184,0.2)] text-[rgba(43,113,184,1)]'
                : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <Album className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Complete</span>
            <span className="text-xs text-gray-500 mt-0.5">{STICKERS.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('missing')}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeTab === 'missing'
                ? 'bg-[rgba(43,113,184,0.2)] text-[rgba(43,113,184,1)]'
                : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <FileX className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Missing</span>
            <span className={`text-xs mt-0.5 ${activeTab === 'missing' ? 'text-[rgba(43,113,184,1)]' : 'text-gray-500'}`}>
              {missingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('repeated')}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              activeTab === 'repeated'
                ? 'bg-yellow-500/20 text-yellow-500'
                : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <Copy className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Repeated</span>
            <span className={`text-xs mt-0.5 ${activeTab === 'repeated' ? 'text-yellow-500' : 'text-gray-500'}`}>
              {repeatedCount}
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}
