import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import { Images } from "lucide-react";
import { optimizeCloudinaryUrl } from "../utils/media";
import { asArray } from "../utils/normalize";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";

export default function GalleryHome() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get("/gallery/public")
      .then((res) => setGalleries(asArray(res.data)))
      .catch(() => {
        setGalleries([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="Gallery" title="The archive." tone="muted">
        Relive the moments — every event, every memory, captured and preserved.
      </PageHeader>

      <Container className="py-16 md:py-24">
        {loading && (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4 h-64 animate-pulse bg-white/5" />
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-400">Gallery could not be loaded.</p>}

        {!loading && galleries.length === 0 && !error && (
          <div className="py-24 text-center text-neutral-500">
            <Images className="mx-auto mb-4 opacity-40" />
            <p>No galleries yet. Check back after events.</p>
          </div>
        )}

        {!loading && galleries.length > 0 && (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleries.map((g, i) => (
              <Link
                key={g._id}
                to={`/gallery/${g.slug}`}
                className={`group mb-4 block break-inside-avoid overflow-hidden grayscale transition duration-700 hover:grayscale-0 ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
              >
                <div className="relative h-full bg-neutral-950">
                  <img
                    src={optimizeCloudinaryUrl(g.cover?.url, 1000)}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-orange-500">
                      {g.imageCount} photos
                    </p>
                    <h2 className="mt-1 font-display text-2xl">{g.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
