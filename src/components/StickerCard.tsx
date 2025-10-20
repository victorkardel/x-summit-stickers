import { motion } from "framer-motion";
import { Minus } from "lucide-react";
import type { Sticker } from "../constants/stickers";

interface StickerCardProps {
  sticker: Sticker;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function StickerCard({
  sticker,
  count,
  onIncrement,
  onDecrement,
}: StickerCardProps) {
  const isCollected = count > 0;
  const isRepeated = count > 1;
  const hasOnlyOne = count === 1;

  return (
    <motion.div
      className="relative"
      initial={false}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Main Card */}
      <motion.div
        className={`relative rounded-lg shadow-lg p-3 flex flex-col items-center justify-center aspect-square transition-all cursor-pointer bg-transparent border-2 ${
          !isCollected
            ? "border-[rgba(43,113,184,1)]"
            : hasOnlyOne
            ? "border-[#B8332A]"
            : "border-yellow-500"
        }`}
        initial={false}
        animate={{ scale: 1 }}
      >
        {/* Remove Button at Top */}
        {isCollected && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onDecrement();
            }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-lg transition-all z-10 border border-red-500 active:scale-95 min-w-max"
          >
            <Minus size={14} />
            <span className="text-xs font-semibold whitespace-nowrap">
              Trade
            </span>
          </motion.button>
        )}

        {/* Main Card Content - Click to add */}
        <motion.div
          onClick={onIncrement}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          {/* Count Badge */}
          {count > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                hasOnlyOne
                  ? "bg-[#B8332A] text-white"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {count}
            </motion.div>
          )}

          {sticker.imageUrl ? (
            <img
              src={sticker.imageUrl}
              alt={sticker.name}
              className={`w-full h-full object-cover rounded ${
                !isCollected ? "opacity-70" : ""
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`px-4 py-2 rounded-lg font-bold text-2xl md:text-3xl ${
                  !isCollected
                    ? "bg-[rgba(43,113,184,1)] text-white"
                    : hasOnlyOne
                    ? "bg-[#B8332A] text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {sticker.id}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
