import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import EvolveraGallery from "./EvolveraGallery";
import { ArrowLeft } from "lucide-react";

export default function GalleryEvent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/gallery/${slug}`)
      .then((res) => setGallery(res.data))
      .catch(() => setGallery(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-zinc-900 rounded-2xl animate-pulse w-64 mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-gray-500 text-lg">Gallery not found</p>
        <button
          onClick={() => navigate("/gallery")}
          className="flex items-center gap-2 text-orange-500 font-bold text-sm hover:underline"
        >
          <ArrowLeft size={16} /> Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <EvolveraGallery
      title={gallery.title}
      images={gallery.images.map((img) => img.url)}
    />
  );
}