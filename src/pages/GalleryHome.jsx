import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

export default function GalleryHome() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => setGalleries(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading gallery...
      </div>
    );
  }

  return (
    <section className="bg-black min-h-screen py-32 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-extrabold mb-20">
          EVENT <span className="text-orange-500">GALLERY</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {galleries.map((g, i) => (
            <motion.div key={g._id} whileHover={{ y: -12 }}>
              <Link to={`/gallery/${g.slug}`}>
                <div className="group relative rounded-3xl overflow-hidden border border-white/10">

                  <img
                    src={g.cover.url}
                    alt={g.title}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/60 flex items-end p-6">
                    <div>
                      <h2 className="text-xl font-bold">{g.title}</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        View Event Photos →
                      </p>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
