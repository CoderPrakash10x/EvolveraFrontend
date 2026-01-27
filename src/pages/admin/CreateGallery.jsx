import { useState } from "react";
import { createAdminGallery } from "../../services/gallery.admin.service";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
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
      setTimeout(() => navigate("/admin/gallery"), 1200);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-black mb-10">
        Create <span className="text-orange-500">Gallery</span>
      </h1>

      <form onSubmit={submit} className="space-y-6">
        <input
          placeholder="Gallery Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          required
        />

        <input type="file" required onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />

        {loading && (
          <div className="space-y-2">
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/70">Uploading… {progress}%</p>
          </div>
        )}

        {success && (
          <p className="text-green-400 text-sm font-semibold">
            ✅ Gallery created successfully
          </p>
        )}

        <button
          disabled={loading}
          className={`px-8 py-4 font-black rounded-xl transition-all
            ${
              loading
                ? "bg-orange-300 text-black cursor-not-allowed"
                : "bg-orange-500 text-black hover:scale-105"
            }
          `}
        >
          {loading ? "Uploading..." : "Create Gallery"}
        </button>
      </form>
    </div>
  );
};

export default CreateGallery;
