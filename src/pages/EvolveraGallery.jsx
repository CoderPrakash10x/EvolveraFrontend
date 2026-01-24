import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

export default function EvolveraGallery({ images, title }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const displayedImages = images.slice(0, visibleCount);

  return (
    <section className="bg-[#050505] text-white py-32 px-6 min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-xs tracking-[0.4em] uppercase mt-4">
            Event Gallery
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImg(img)}
              className="relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-black">
                  <Maximize2 size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < images.length && (
          <div className="text-center mt-20">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="text-xs uppercase tracking-[0.3em] border-b border-orange-500 pb-2 hover:text-orange-500"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              src={selectedImg}
              className="max-w-full max-h-[90vh] rounded-xl"
            />
            <button className="absolute top-10 right-10 text-white">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
