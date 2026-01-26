import { useState } from "react";
import { createAdminGallery } from "../../services/gallery.admin.service";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("cover", cover);
    images.forEach((img) => fd.append("images", img));

    await createAdminGallery(fd);
    navigate("/admin/gallery");
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
        />

        <input type="file" onChange={(e) => setCover(e.target.files[0])} />

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        <button className="px-8 py-4 bg-orange-500 text-black font-black rounded-xl">
          Create Gallery
        </button>
      </form>
    </div>
  );
};

export default CreateGallery;
