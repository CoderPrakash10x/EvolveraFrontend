import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../utils/media";

export default function EvolveraGallery({
  images = [],
  title,
  totalImages = images.length,
  onLoadMore,
  loadingMore = false,
}) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();
  const safeImages = Array.isArray(images) ? images : [];

  const closeLightbox = () => setSelectedIdx(null);
  const prev = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i > 0 ? i - 1 : safeImages.length - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setSelectedIdx((i) => (i < safeImages.length - 1 ? i + 1 : 0));
  };

  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") setSelectedIdx((i) => (i < safeImages.length - 1 ? i + 1 : 0));
      if (e.key === "ArrowLeft") setSelectedIdx((i) => (i > 0 ? i - 1 : safeImages.length - 1));
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIdx, safeImages.length]);

  return (
    <section className="min-h-screen bg-ink px-6 pb-24 pt-28 text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="mb-10 flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-500"
        >
          <ChevronLeft size={16} /> All galleries
        </button>

        <p className="text-[11px] uppercase tracking-[0.28em] text-orange-500">Event gallery</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.92] tracking-tight">
          {title}
        </h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Images size={14} /> {totalImages} photos
        </p>

        {safeImages.length === 0 && (
          <div className="py-24 text-center text-neutral-600">
            <Images size={40} className="mx-auto mb-4 opacity-30" />
            <p>No photos in this gallery yet.</p>
          </div>
        )}

        <div className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {safeImages.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className={`mb-3 w-full overflow-hidden ${i % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            >
              <img
                src={optimizeCloudinaryUrl(img, 800)}
                alt={`${title} photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>

        {safeImages.length < totalImages && (
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={onLoadMore}
              disabled={loadingMore}
              className="border border-white/15 px-8 py-3 text-sm hover:border-orange-500 hover:text-orange-500"
            >
              {loadingMore ? "Loading..." : `Load more (${totalImages - safeImages.length} remaining)`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500">
              {selectedIdx + 1} / {safeImages.length}
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 hover:text-orange-500"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button type="button" onClick={prev} className="absolute left-4 p-3 hover:text-orange-500" aria-label="Previous">
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={selectedIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={optimizeCloudinaryUrl(safeImages[selectedIdx], 1800)}
              alt=""
              className="max-h-[85vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" onClick={next} className="absolute right-4 p-3 hover:text-orange-500" aria-label="Next">
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
