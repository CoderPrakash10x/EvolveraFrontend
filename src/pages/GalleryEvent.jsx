import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import EvolveraGallery from "./EvolveraGallery";

export default function GalleryEvent() {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => {
        const found = res.data.find((g) => g.slug === slug);
        setGallery(found || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading gallery...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Gallery not found
      </div>
    );
  }

  return (
    <EvolveraGallery
      title={gallery.title}
      images={gallery.images}
    />
  );
}
