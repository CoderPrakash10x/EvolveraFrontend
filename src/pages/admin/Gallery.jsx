import { useEffect, useState } from "react";
import { getAdminGalleries, deleteAdminGallery } from "../../services/gallery.admin.service";
import { Trash2, Plus, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GalleryAdmin = () => {
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getAdminGalleries();
    setGalleries(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this gallery permanently?")) return;
    await deleteAdminGallery(id);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black">Gallery</h2>
        <button
          onClick={() => navigate("/admin/gallery/create")}
          className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-black hover:scale-105 transition"
        >
          <Plus size={18} /> New Gallery
        </button>
      </div>

      {galleries.length === 0 && (
        <p className="text-white/50">No galleries created yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {galleries.map((g) => (
          <div
            key={g._id}
            className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition"
          >
            <img
              src={g.cover.url}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-3">
              <h3 className="font-bold">{g.title}</h3>

              <div className="flex justify-between items-center text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Images size={14} /> {g.images.length} images
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/gallery/${g._id}`)}
                    className="text-orange-400 hover:underline"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => remove(g._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
