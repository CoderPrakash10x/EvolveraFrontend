import { useParams } from "react-router-dom";
import { galleryEvents } from "../data/galleryEvents";
import EvolveraGallery from "./EvolveraGallery";

export default function GalleryEvent() {
  const { slug } = useParams();
  const event = galleryEvents.find(e => e.slug === slug);

  if (!event) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Event Not Found
      </div>
    );
  }

  return <EvolveraGallery images={event.images} title={event.title} />;
}
