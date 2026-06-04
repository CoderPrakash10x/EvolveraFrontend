import { useEffect, useState } from "react";
import { getAdminGalleries, deleteAdminGallery } from "../../services/gallery.admin.service";
import { Trash2, Plus, Images, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GalleryAdmin = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await getAdminGalleries();
      setGalleries(data);
    } catch {
      toast.error("Failed to load galleries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this gallery permanently?")) return;
    setDeletingId(id);
    try {
      await deleteAdminGallery(id);
      toast.success("Gallery deleted");
      setGalleries((prev) => prev.filter((g) => g._id !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black">
            Event <span className="text-orange-500">Gallery</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {galleries.length} {galleries.length === 1 ? "gallery" : "galleries"} total
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/gallery/create")}
          className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-black hover:scale-105 transition"
        >
          <Plus size={18} /> New Gallery
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-zinc-800" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-2/3" />
                <div className="h-3 bg-zinc-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && galleries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="p-6 rounded-full bg-zinc-900 border border-white/10 mb-6">
            <ImageOff size={40} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">No galleries yet</h3>
          <p className="text-gray-600 text-sm mb-6">Create your first gallery to showcase event photos</p>
          <button
            onClick={() => navigate("/admin/gallery/create")}
            className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-black hover:scale-105 transition"
          >
            <Plus size={18} /> Create Gallery
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && galleries.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((g) => (
            <div
              key={g._id}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition group"
            >
              {/* COVER IMAGE */}
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={g.cover.url}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* IMAGE COUNT BADGE */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs text-white font-bold">
                  <Images size={12} className="text-orange-400" />
                  {g.images.length}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-4 truncate">{g.title}</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/gallery/${g._id}`)}
                    className="flex-1 py-2 text-xs font-bold rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => remove(g._id)}
                    disabled={deletingId === g._id}
                    className="px-3 py-2 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-40"
                  >
                    {deletingId === g._id
                      ? <span className="animate-spin inline-block">⏳</span>
                      : <Trash2 size={14} />
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;