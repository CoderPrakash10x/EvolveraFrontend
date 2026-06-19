import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, ImagePlus, Images } from "lucide-react";

const AdminGalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previews, setPreviews] = useState([]);

  const load = async () => {
    try {
      const res = await API.get(`/gallery/admin/${id}`);
      setGallery(res.data);
    } catch {
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleFiles = (e) => {
    const files = [...e.target.files];
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const addImages = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setProgress(0);

    const fd = new FormData();
    images.forEach((img) => fd.append("images", img));

    try {
      await API.post(`/gallery/admin/${id}/images`, fd, {
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });
      toast.success(`${images.length} images uploaded!`);
      setImages([]);
      setPreviews([]);
      load();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!gallery) return (
    <div className="space-y-4">
      <div className="h-8 bg-zinc-800 rounded animate-pulse w-48" />
      <div className="h-64 bg-zinc-800 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-zinc-800 rounded-xl animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/gallery")}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-black">{gallery.title}</h1>
            <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
              <Images size={13} /> {gallery.images.length} images in gallery
            </p>
          </div>
        </div>
      </div>

      {/* COVER */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">Cover Image</p>
        <div className="relative rounded-2xl overflow-hidden h-56 max-w-lg border border-white/10">
          <img
            src={gallery.cover.url}
            alt={gallery.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">Cover</span>
          </div>
        </div>
      </div>

      {/* UPLOAD MORE */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-lg space-y-5">
        <h3 className="font-black text-lg">Add More Images</h3>

        <label className="cursor-pointer block">
          <div className={`rounded-xl border-2 border-dashed p-5 flex flex-col items-center gap-2 transition
            ${previews.length > 0
              ? "border-orange-500/40 bg-orange-500/5"
              : "border-white/10 hover:border-orange-500/30"
            }`}
          >
            <ImagePlus size={22} className={previews.length > 0 ? "text-orange-400" : "text-gray-600"} />
            {previews.length > 0
              ? <p className="text-orange-400 text-sm font-bold">{images.length} files selected</p>
              : <p className="text-gray-500 text-sm">Click to select images</p>
            }
          </div>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />
        </label>

        {/* PREVIEWS — lazy load these too */}
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {previews.map((p, i) => (
              <img
                key={i}
                src={p}
                loading="lazy"
                decoding="async"
                className="h-16 w-full object-cover rounded-lg border border-white/10"
              />
            ))}
          </div>
        )}

        {/* PROGRESS */}
        {loading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={addImages}
          disabled={loading || images.length === 0}
          className="w-full py-3 bg-orange-500 text-black font-black rounded-xl hover:scale-[1.02] transition disabled:opacity-40 disabled:hover:scale-100"
        >
          {loading ? `Uploading ${progress}%...` : `Upload ${images.length > 0 ? images.length + " " : ""}Images`}
        </button>
      </div>

      {/* GALLERY GRID */}
      {gallery.images.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-bold">
            Gallery Images ({gallery.images.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {gallery.images.map((img) => (
              <div key={img._id} className="group relative rounded-xl overflow-hidden h-36 border border-white/5 bg-black">
                <img
                  src={img.url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {gallery.images.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <Images size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No images yet — upload some above!</p>
        </div>
      )}

    </div>
  );
};

export default AdminGalleryDetail;