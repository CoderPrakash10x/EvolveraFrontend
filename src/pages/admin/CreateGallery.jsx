import { useState } from "react";
import { createAdminGallery } from "../../services/gallery.admin.service";
import { useNavigate } from "react-router-dom";
import { Upload, ImagePlus, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const CreateGallery = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCover(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!cover) { toast.error("Cover image required"); return; }

    setLoading(true);
    setProgress(0);
    setSuccess(false);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("cover", cover);
    images.forEach((img) => fd.append("images", img));

    try {
      await createAdminGallery(fd, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });
      setSuccess(true);
      toast.success("Gallery created!");
      setTimeout(() => navigate("/admin/gallery"), 1200);
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* HEADER */}
      <h1 className="text-4xl font-black mb-2">
        Create <span className="text-orange-500">Gallery</span>
      </h1>
      <p className="text-gray-500 text-sm mb-10">Add a new event photo gallery</p>

      <form onSubmit={submit} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Gallery Title *</label>
          <input
            placeholder="e.g. Hackathon 2024"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
            required
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Cover Image *</label>
          <label className="cursor-pointer block">
            {coverPreview ? (
              <div className="relative rounded-xl overflow-hidden h-48 border border-orange-500/30">
                <img src={coverPreview} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <p className="text-white text-sm font-bold">Click to change</p>
                </div>
              </div>
            ) : (
              <div className="h-48 rounded-xl border-2 border-dashed border-white/10 hover:border-orange-500/40 flex flex-col items-center justify-center gap-3 transition bg-zinc-900">
                <Upload size={28} className="text-gray-600" />
                <p className="text-gray-500 text-sm">Click to upload cover image</p>
                <p className="text-gray-700 text-xs">JPG, PNG, WEBP — max 5MB</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              required
              onChange={handleCover}
            />
          </label>
        </div>

        {/* GALLERY IMAGES */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Gallery Images
            <span className="text-gray-600 ml-2">(optional — you can add later)</span>
          </label>
          <label className="cursor-pointer block">
            <div className={`rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-3 transition
              ${images.length > 0
                ? "border-orange-500/30 bg-orange-500/5"
                : "border-white/10 hover:border-orange-500/30 bg-zinc-900"
              }`}
            >
              <ImagePlus size={24} className={images.length > 0 ? "text-orange-400" : "text-gray-600"} />
              {images.length > 0 ? (
                <p className="text-orange-400 text-sm font-bold">{images.length} images selected</p>
              ) : (
                <p className="text-gray-500 text-sm">Click to select multiple images</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImages}
            />
          </label>
        </div>

        {/* PROGRESS */}
        {loading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Uploading to Cloudinary...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
            <CheckCircle size={16} />
            <span className="text-sm font-bold">Gallery created! Redirecting...</span>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 font-black rounded-xl transition-all text-sm uppercase tracking-wider
            ${loading
              ? "bg-orange-500/40 text-black cursor-not-allowed"
              : "bg-orange-500 text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            }`}
        >
          {loading ? `Uploading... ${progress}%` : "Create Gallery"}
        </button>

      </form>
    </div>
  );
};

export default CreateGallery;