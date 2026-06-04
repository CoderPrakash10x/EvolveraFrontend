import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";
import { Images } from "lucide-react";

export default function GalleryHome() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => setGalleries(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-black min-h-screen py-32 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-orange-500" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">
              Memories
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Event <span className="text-orange-500">Gallery</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-md text-sm leading-relaxed">
            Relive the moments — every event, every memory, captured and preserved.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-white/5 animate-pulse">
                <div className="h-64 bg-zinc-900" />
                <div className="p-5 bg-zinc-900/50 space-y-2">
                  <div className="h-4 bg-zinc-800 rounded w-2/3" />
                  <div className="h-3 bg-zinc-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && galleries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="p-8 rounded-full bg-zinc-900 border border-white/5 mb-6">
              <Images size={40} className="text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-500 mb-2">No galleries yet</h3>
            <p className="text-gray-700 text-sm">Check back after events!</p>
          </div>
        )}

        {/* GRID */}
        {!loading && galleries.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((g, i) => (
              <motion.div
                key={g._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/gallery/${g.slug}`} className="block group">
                  <div className="relative rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500">

                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden bg-zinc-900">
                      <img
                        src={g.cover.url}
                        alt={g.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* IMAGE COUNT */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold">
                        <Images size={11} className="text-orange-400" />
                        {g.images.length} photos
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-xl font-black group-hover:text-orange-500 transition-colors">
                        {g.title}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        View Event Photos
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}