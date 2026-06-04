import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EvolveraGallery({ images, title }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  const displayedImages = images.slice(0, visibleCount);

  const openLightbox = (idx) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const prev = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  // Keyboard navigation
  const handleKey = (e) => {
    if (e.key === "ArrowRight") setSelectedIdx((i) => (i < images.length - 1 ? i + 1 : 0));
    if (e.key === "ArrowLeft") setSelectedIdx((i) => (i > 0 ? i - 1 : images.length - 1));
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <section
      className="bg-[#050505] text-white py-32 px-6 min-h-screen"
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <button
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition text-sm font-bold mb-8"
          >
            <ChevronLeft size={16} /> All Galleries
          </button>

          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-orange-500" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">
              Event Gallery
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-gray-600 text-sm flex items-center gap-2">
            <Images size={14} />
            {images.length} photos
          </p>
        </div>

        {/* EMPTY */}
        {images.length === 0 && (
          <div className="text-center py-24 text-gray-700">
            <Images size={40} className="mx-auto mb-4 opacity-30" />
            <p>No photos in this gallery yet.</p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(i)}
              className="relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 aspect-square group"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <X size={16} className="rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE */}
        {visibleCount < images.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setVisibleCount((v) => v + 12)}
              className="px-10 py-4 border border-white/10 hover:border-orange-500/50
                         text-sm font-bold rounded-2xl hover:text-orange-500 transition"
            >
              Load More ({images.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 px-4"
            onClick={closeLightbox}
          >
            {/* COUNTER */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-bold">
              {selectedIdx + 1} / {images.length}
            </div>

            {/* CLOSE */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <X size={20} />
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={images[selectedIdx]}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}