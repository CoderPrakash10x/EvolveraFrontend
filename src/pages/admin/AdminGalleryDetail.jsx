import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

const AdminGalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  
  const load = async () => {
    const res = await API.get(`/gallery/admin/${id}`);
    setGallery(res.data);
  };

  useEffect(() => {
    load();
  }, [id]);

 
  const addImages = async () => {
    if (images.length === 0) return;

    setLoading(true);
    setProgress(0);
    setSuccess(false);

    const fd = new FormData();
    images.forEach((img) => fd.append("images", img));

    try {
      await API.post(`/gallery/admin/${id}/images`, fd, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setImages([]);
      setSuccess(true);
      load();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!gallery) return <div>Loading...</div>;

  return (
    <div className="space-y-12">

      
      <div>
        <h1 className="text-4xl font-black">{gallery.title}</h1>
        <p className="text-white/50 text-sm mt-2">
          {gallery.images.length} images
        </p>
      </div>

      
      <div>
        <p className="mb-2 text-sm text-white/60">Cover Image</p>
        <img
          src={gallery.cover.url}
          className="w-full max-w-xl rounded-2xl"
        />
      </div>

      {/* Upload More */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-4 max-w-xl">
        <h3 className="font-bold">Add More Images</h3>

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        {loading && (
          <div className="space-y-2">
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/60">
              Uploading… {progress}%
            </p>
          </div>
        )}

        {success && (
          <p className="text-green-400 text-sm font-semibold">
            Images uploaded successfully
          </p>
        )}

        <button
          onClick={addImages}
          disabled={loading}
          className="bg-orange-500 text-black px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          Add Images
        </button>
      </div>

      {/* Images Grid */}
      <div>
        <h3 className="font-bold mb-4">Gallery Images</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.images.map((img) => (
            <img
              key={img._id}
              src={img.url}
              className="rounded-xl object-cover h-40 w-full hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminGalleryDetail;
